const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required:true
    },
    artist: {type: mongoose.Schema.Types.ObjectId, ref: 'Artist' , required:true},
    album: {type: mongoose.Schema.Types.ObjectId, ref: 'Album' , required:true}
})

module.exports = mongoose.model('Song' , songSchema);