const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect(
    'mongodb+srv://admin:admin@cluster0-un0i4.mongodb.net/app_edu?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT || 3333, () => console.log('Application running...'));
