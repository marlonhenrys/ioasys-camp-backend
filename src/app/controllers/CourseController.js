const Regex = require('../utils/regexStringCleaner');
const Course = require('../models/Course');

module.exports = {

    async index(request, response) {
        const { institution = '', course = '', campus = '', size = 50 } = request.query;
        //Removing special characters and extra spaces from strings
        const courseFiltered = Regex(course);
        const institutionFiltered = Regex(institution);
        const campusFiltered = Regex(campus);

        //Filtering for size (there is an internal max limit of 10000)
        let sizeFiltered;
        if(isNaN(Number(size))){
            sizeFiltered = 50;
        } else {
            sizeFiltered = size;
            if(sizeFiltered > 200){
                sizeFiltered = 200;
            }
        }

        //Work around to return all values if param does not exist
        let courseNameQuery = {match_all: {}};
        let institutionQuery = {match_all: {}};
        if(courseFiltered && courseFiltered != ''){
            courseNameQuery = {
                match_phrase_prefix: {'name': courseFiltered},
            }
        }
        if(institution && institution != ''){
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
        }, {size: sizeFiltered, hydrate: true, hydrateWithESResults: true}, (err, results) => {
            if(err){
                return response.status(400).send(err);
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