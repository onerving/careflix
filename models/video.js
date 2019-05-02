var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    filename: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    related: {
        type: Object,
    }
});

VideoSchema.plugin(random);
VideoSchema.index({category: 1});
var Video = mongoose.model('Video', VideoSchema);
module.exports = Video;
