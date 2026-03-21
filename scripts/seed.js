// require('dotenv').config();
// const Album = require('../models/Album');
// const Artist = require('../models/Artist');
// const Playlist = require('../models/Playlist');
// const Song = require('../models/Song');
// const User = require('../models/User');


// const mongoose = require('mongoose');

// const mongodbURI = process.env.MONGODB_URI;

// async function seed(){
//     try {
//         await mongoose.connect(mongodbURI);
//         console.log('Connected!');

//         await Album.deleteMany({});
//         await Artist.deleteMany({});
//         await Playlist.deleteMany({});
//         await Song.deleteMany({});
//         await User.deleteMany({});


//         const artist = await Artist.create({
//       name: 'Daft Punk',
//       genre: 'Pop',
//       bio: 'French electronic music duo.'
//     });
//     console.log(`Created Artist: ${artist.name}`);

//     // 3. Create an Album (Linked to Artist)
//     const album = await Album.create({
//       title: 'Discovery',
//       releaseYear: 2001,
//       artist: artist._id, // REFERENCING ID
//       coverImage: 'https://example.com/cover.jpg'
//     });
//     console.log(`Created Album: ${album.title}`);

//     // 4. Create a Song (Linked to Album and Artist)
//     const song = await Song.create({
//       title: 'One More Time',
//       duration: 320,
//       album: album._id,  // REFERENCING ID
//       artist: artist._id // REFERENCING ID
//     });
//     console.log(`Created Song: ${song.title}`);

//     // 5. Create a User
//     const user = await User.create({
//       username: 'music_fan_01',
//       email: 'fan@example.com',
//       password: 'hashed_password_123' 
//     });
//     console.log(`Created User: ${user.username}`);


//     const playlist = await Playlist.create({
//       name: 'Gym Jams',
//       user: user._id,    // REFERENCING ID
//       songs: [song._id], // ARRAY OF IDs
//       description: 'High energy tracks'
//     });
//     console.log(`Created Playlist: ${playlist.name}`);

//     console.log('✅ Seeding Complete!');
//     process.exit(0);


//     } catch (error) {
//         console.error('❌ Seeding Failed:', error);
//     process.exit(1);
        
//     }
// }


// seed();



require('dotenv').config();
const mongoose = require('mongoose');

const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Song = require('../models/Song');
const User = require('../models/User');
const Playlist = require('../models/Playlist');

const genres = ['Pop', 'Rock', 'Electronic', 'Hip Hop', 'Jazz'];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Promise.all([
      Artist.deleteMany({}),
      Album.deleteMany({}),
      Song.deleteMany({}),
      User.deleteMany({}),
      Playlist.deleteMany({})
    ]);

    console.log('Old data cleared');

    // 1️⃣ Artists
    const artistData = [];
    for (let i = 0; i < 30; i++) {
      artistData.push({
        name: `Artist_${i}`,
        genre: randomItem(genres),
        bio: `Bio for artist ${i}`
      });
    }
    const artists = await Artist.insertMany(artistData);

    // 2️⃣ Albums
    const albumData = [];
    for (let i = 0; i < 100; i++) {
      albumData.push({
        title: `Album_${i}`,
        releaseYear: 2000 + (i % 24),
        artist: randomItem(artists)._id
      });
    }
    const albums = await Album.insertMany(albumData);

    // 3️⃣ Songs
    const songData = [];
    for (let i = 0; i < 2000; i++) {
      songData.push({
        title: `Song_${i}`,
        duration: Math.floor(Math.random() * 400),
        genre: randomItem(genres),
        releaseYear: 2000 + (i % 24),
        artist: randomItem(artists)._id,
        album: randomItem(albums)._id
      });
    }
    const songs = await Song.insertMany(songData);

    // 4️⃣ Users
    const userData = [];
    for (let i = 0; i < 200; i++) {
      userData.push({
        username: `user_${i}`,
        email: `user${i}@example.com`,
        password: 'hashed_password'
      });
    }
    const users = await User.insertMany(userData);

    // 5️⃣ Playlists
    const playlistData = [];
    for (let i = 0; i < 400; i++) {
      const randomSongs = [];
      for (let j = 0; j < 15; j++) {
        randomSongs.push(randomItem(songs)._id);
      }

      playlistData.push({
        name: `Playlist_${i}`,
        description: 'Auto generated playlist',
        user: randomItem(users)._id,
        songs: randomSongs
      });
    }

    await Playlist.insertMany(playlistData);

    console.log('Database seeded successfully!');
    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();