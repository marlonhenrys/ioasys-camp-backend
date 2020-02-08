const Regex = require('../utils/regexStringCleaner')
const SizeFilter = require('../utils/sizeFilter');

const Subject = require('../models/Subject')

module.exports = {

    async index(request, response) {

        const { course = '', subject = '', size = 0 } = request.query;
        //Removing special characters and extra spaces from strings
        const courseFiltered = Regex(course);
        const subjectFiltered = Regex(subject);

        //Work around to return all values if param does not exist
        let courseQuery = {match_all: {}};
        let subjectNameQuery = {match_all: {}};
        if(subjectFiltered && subjectFiltered != ''){
            subjectNameQuery = {
                multi_match: {
                    query: subjectFiltered,
                    type: 'bool_prefix',
                    fuzziness: 'AUTO',
                    fields: [
                      'name',
                      'name._2gram',
                      'name._3gram'
                    ],
                }
            }
        }
        if(courseFiltered && courseFiltered != ''){
            courseQuery = {
                term: {'course._id': courseFiltered},
            }
        }

        //Query itself
        Subject.search({
            bool: {
                must: [
                    courseQuery,
                    subjectNameQuery,
                ]
            }
        }, {size: SizeFilter(size), hydrate: false, hydrateWithESResults: true}, (error, results) => {
            if(error){
                return response.status(400).json({
                    message: 'Unable to fetch subjects.',
                    error
                });
            }
            return response.status(200).json(results.hits.hits);
        });
    },

    async show(request, response) {

        const { id } = request.params;

        try {
            const subject = await Subject.findById(id);
            return response.status(200).json(subject);

        } catch (error) {
            return response.status(404).json({
                message: 'Subject not found',
                error
            });
        }
    }
}