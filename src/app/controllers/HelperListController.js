const Regex = require('../utils/regexStringCleaner');
const SizeFilter = require('../utils/sizeFilter');

const HelperList = require('../models/HelperList');

module.exports = {
    
    async index(request, response) {

        const { institution = '', course = '', campus = '', subject = '', size = 0 } = request.query;
        //Removing special characters and extra spaces from strings
        const courseFiltered = Regex(course);
        const institutionFiltered = Regex(institution);
        const subjectFiltered = Regex(subject);
        const campusFiltered = Regex(campus);

        //Work around to return all values if param does not exist
        let courseNameQuery = {match_all: {}};
        let institutionQuery = {match_all: {}};
        let subjectQuery = {match_all: {}};
        if(courseFiltered && courseFiltered != ''){
            courseNameQuery = {
                multi_match: {
                    query: courseFiltered,
                    type: 'bool_prefix',
                    fuzziness: 'AUTO',
                    fields: [
                      'helper.course.name',
                      'helper.course.name._2gram',
                      'helper.course.name._3gram'
                    ],
                },
            }
        }
        if(subjectFiltered && subjectFiltered != ''){
            subjectQuery = {
                multi_match: {
                    query: subjectFiltered,
                    type: 'bool_prefix',
                    fuzziness: 'AUTO',
                    fields: [
                      'subjects.name',
                      'subjects.name._2gram',
                      'subjects.name._3gram'
                    ],
                },
            }
        }
        if(institutionFiltered && institutionFiltered != ''){
            institutionQuery = {
                term: {'helper.course.institution._id': institutionFiltered},
            }
        }

        //Query itself
        let list = [];
        await HelperList.search({
            bool: {
                must: [
                    institutionQuery,
                    courseNameQuery,
                    subjectQuery,
                ],
                should: [
                    {match_phrase_prefix: {
                        'campus': campusFiltered,
                    }}, 
                ],
            },
        }, {size: SizeFilter(size), hydrate: false, hydrateWithESResults: true,}, (err, results) => {
            if(err){
                return response.status(400).json({
                    message: 'Unable to fetch helpers.'
                });
            }
            return response.status(200).json(results.hits.hits);
        });
    },

    async show(request, response) {

        const { helper } = request.params;

        const helperList = await HelperList.find({ helper });

        return response.status(200).json(helperList);
    },

    async store(request, response) {

        const { subjects } = request.body;
        const { student } = request;

        try {
            const helperList = await HelperList.find({ helper: student });

            subjects.map(subject => {
                if (!helperList.subjects.includes(subject))
                    helperList.subjects.push(subject);
            });

            await helperList.save();

            return response.status(200).json(helperList);

        } catch (error) {
            return response.status(400).json({
                message: 'Failed to save',
                error
            });
        }
    },

    async destroy(request, response) {

        const { id } = request.params;
        const { student } = request;

        try {
            const helperList = await HelperList.find({ helper: student });

            const newList = helperList.subjects.filter(subject => subject != id);

            helperList.subjects = newList;

            await helperList.save();

            return response.status(200).json({
                message: 'Successful deletion'
            });

        } catch (error) {
            return response.status(400).json({
                message: 'Deletion failed',
                error
            });
        }
    }
}