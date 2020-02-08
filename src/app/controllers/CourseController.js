const Regex = require('../utils/regexStringCleaner');
const SizeFilter = require('../utils/sizeFilter');

const Course = require('../models/Course');

module.exports = {

    async index(request, response) {
        const { institution = '', course = '', campus = '', size = 0 } = request.query;
        //Removing special characters and extra spaces from strings
        const courseFiltered = Regex(course);
        const institutionFiltered = Regex(institution);
        const campusFiltered = Regex(campus);

        //Work around to return all values if param does not exist
        let courseNameQuery = {match_all: {}};
        let institutionQuery = {match_all: {}};
        if(courseFiltered && courseFiltered != ''){
            courseNameQuery = {
                multi_match: {
                    query: courseFiltered,
                    type: 'bool_prefix',
                    fuzziness: 'AUTO',
                    fields: [
                      'name',
                      'name._2gram',
                      'name._3gram'
                    ],
                },
            }
        }
        if(institutionFiltered && institutionFiltered != ''){
            institutionQuery = {
                term: {'institution._id': institutionFiltered},
            }
        }

        //Query itself
        Course.search({
            bool: {
                must: [
                    institutionQuery,
                    courseNameQuery,
                ],
                should: [
                    {match_phrase_prefix: {
                        'campus': campusFiltered,
                    }}, 
                ],
            },
        }, {size: SizeFilter(size), hydrate: true, hydrateWithESResults: true}, (error, results) => {
            if(error){
                return response.status(400).json({
                    message: 'Unable to fetch courses.',
                    error
                });
            }
            return response.status(200).json(results.hits.hits);
        });
    },

    async show(request, response) {

        const { id } = request.params;

        try {
            const course = await Course.findById(id);
            return response.status(200).json(course);

        } catch (error) {
            return response.status(404).json({
                message: 'Course not found',
                error
            });
        }
    }
}