var mongoose = require('mongoose');
var HistorySchema = new mongoose.Schema({
    license: {
        type: Number,
        unique: true,
        required: true,
    },
    watchedVideos: {
        type: Array,
        required: true,
    }
});


var History = mongoose.model('History', HistorySchema);
module.exports = History;