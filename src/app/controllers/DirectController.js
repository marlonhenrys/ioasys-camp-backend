const Regex = require('../utils/regexStringCleaner');
const SizeFilter = require('../utils/sizeFilter');

const Direct = require('../models/Direct');

module.exports = {
    async index(request, response) {
        const { helper } = request.params.id;

        const directs = await Direct.find({ helper });
        
        return response.status(200).json(directs);
    },
    async show(request, response) {
        const { helper } = request.params.id;
        const { id } = request.params.direct;

        const directs = await Direct.find({ helper });
        const direct = directs.filter((value) => {
            if(value.id === id){
                return value;
            }
        });
        
        return response.status(200).json(direct);
    },
    async store(request, response) {
        const { ...data } = request.body;

        try{
            const direct = await Direct.create({ data });
            return request.status(201).json(direct);
        } catch (error) {
            return request.status(400).json({
                message: 'Unable to create direct message.',
                error
            });
        }
    },
    async update(request, response) {
        const { id } = request.params;
        const { ...data } = request.body;
        
        try {
            const direct = await Direct.findByIdAndUpdate({ id }, { data });
            return request.status(204).json({direct});
        } catch (error) {
            return request.status(400).json({
                message: 'Unable to update direct message.',
                error
            });
        }
    },
    async destroy(request, response) {
        const { id } = request.params;

        try {
            const direct = await Direct.findByIdAndDelete({ id });
            return request.status(204).json({direct});
        } catch (error) {
            return request.status(400).json({
                message: 'Unable to delete direct message',
                error
            });
        }
    },
}