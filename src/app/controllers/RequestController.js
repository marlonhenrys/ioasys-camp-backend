const Regex = require('../utils/regexStringCleaner');
const SizeFilter = require('../utils/sizeFilter');

const Request = require('../models/Request');

module.exports = {
    async index(request, response) {
        const { institution = '', course = '', campus = '', subject = '', size = 0 } = request.query;
        //Removing special characters and extra spaces from strings
        const courseFiltered = Regex(course);
        const institutionFiltered = Regex(institution);
        const subjectFiltered = Regex(subject);
        const campusFiltered = Regex(campus);

        //Work around to return all values if param does not exist
        let courseNameQuery = { match_all: {} };
        let institutionQuery = { match_all: {} };
        let subjectQuery = { match_all: {} };
        if (courseFiltered && courseFiltered != '') {
            courseNameQuery = {
                multi_match: {
                    query: courseFiltered,
                    type: 'bool_prefix',
                    fuzziness: 'AUTO',
                    fields: [
                        'requester.course.name',
                        'requester.course.name._2gram',
                        'requester.course.name._3gram'
                    ],
                },
            }
        }
        if (subjectFiltered && subjectFiltered != '') {
            subjectQuery = {
                multi_match: {
                    query: subjectFiltered,
                    type: 'bool_prefix',
                    fuzziness: 'AUTO',
                    fields: [
                        'subject.name',
                        'subject.name._2gram',
                        'subject.name._3gram'
                    ],
                },
            }
        }
        if (institutionFiltered && institutionFiltered != '') {
            institutionQuery = {
                term: { 'requester.course.institution._id': institutionFiltered },
            }
        }

        //Query itself
        let list = [];
        await Request.search({
            bool: {
                must: [
                    institutionQuery,
                    courseNameQuery,
                    subjectQuery,
                ],
                should: [
                    {
                        match_phrase_prefix: {
                            'campus': campusFiltered,
                        }
                    },
                ],
            },
<<<<<<< HEAD:src/app/controllers/HelpRequestController.js
        }, {size: SizeFilter(size), hydrate: true, hydrateWithESResults: true,}, (err, results) => {
            if(err){
                return response.status(400).json({
                    message: 'Unable to fetch Requests.'
                });
=======
        }, { size: SizeFilter(size), hydrate: false, hydrateWithESResults: true, }, (err, results) => {
            if (err) {
                return response.status(400).send(err);
>>>>>>> 0142332c26d4126ebb8311261c55ed341920512b:src/app/controllers/RequestController.js
            }
            return response.status(200).json(results.hits.hits);
        });
    },
    async show(request, response) {

    },
    async store(request, response) {

    },
    async update(request, response) {

    },
    async destroy(request, response) {

    },
}