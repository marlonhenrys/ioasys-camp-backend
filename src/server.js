const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

//Swagger
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'ioasys CAMP 2020',
            description: 'Education',
            contact: {
                name: "Educação Developer"
            },
            servers: ["http://localhost:3333"]
        }
    },  
    apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /subjects:
 *  get:
 *    description: Use to request all students
 *    responses:
 *      '200':
 *        description: A successful response
 */

mongoose.connect('mongodb+srv://admin:admin@cluster0-un0i4.mongodb.net/app_edu?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT || 3333, () => console.log('Application running...'));