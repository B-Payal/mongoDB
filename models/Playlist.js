// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const playlistSchema = new Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     songs: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Song'
//     }]
// })

// module.exports = mongoose.model('PLaylist' , playlistSchema);


const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song'
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Playlist', playlistSchema);