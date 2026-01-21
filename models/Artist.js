const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    name: {
        type:String,
        required:true,
        unique:true,
    },
    genre:{
        type:String,
        enum: ['Pop','Rock','Hip-Hop'],
    },
    bio:{
        type:String,
        required: false
    }
})

const Artist = mongoose.model('Artist' , artistSchema);
module.exports = Artist;