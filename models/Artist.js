// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const artistSchema = new Schema({
//     name: {
//         type:String,
//         required:true,
//         unique:true,
//     },
//     genre:{
//         type:String,
//         enum: ['Pop','Rock','Hip-Hop'],
//     },
//     bio:{
//         type:String,
//         required: false
//     }
// })

// const Artist = mongoose.model('Artist' , artistSchema);
// module.exports = Artist;


const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Artist', artistSchema);