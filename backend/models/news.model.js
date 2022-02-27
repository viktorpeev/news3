const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    image:{type: String, required: true },
    date: { type: Date, required: true },

},    {
        timestamps:true,
});

const News = mongoose.model('News',newsSchema);

module.exports = News;