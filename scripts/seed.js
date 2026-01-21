require('dotenv').config();
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const Playlist = require('../models/Playlist');
const Song = require('../models/Song');
const User = require('../models/User');


const mongoose = require('mongoose');

const mongodbURI = process.env.MONGODB_URI;

async function seed(){
    try {
        await mongoose.connect(mongodbURI);
        console.log('Connected!');

        await Album.deleteMany({});
        await Artist.deleteMany({});
        await Playlist.deleteMany({});
        await Song.deleteMany({});
        await User.deleteMany({});


        const artist = await Artist.create({
      name: 'Daft Punk',
      genre: 'Pop',
      bio: 'French electronic music duo.'
    });
    console.log(`Created Artist: ${artist.name}`);

    // 3. Create an Album (Linked to Artist)
    const album = await Album.create({
      title: 'Discovery',
      releaseYear: 2001,
      artist: artist._id, // REFERENCING ID
      coverImage: 'https://example.com/cover.jpg'
    });
    console.log(`Created Album: ${album.title}`);

    // 4. Create a Song (Linked to Album and Artist)
    const song = await Song.create({
      title: 'One More Time',
      duration: 320,
      album: album._id,  // REFERENCING ID
      artist: artist._id // REFERENCING ID
    });
    console.log(`Created Song: ${song.title}`);

    // 5. Create a User
    const user = await User.create({
      username: 'music_fan_01',
      email: 'fan@example.com',
      password: 'hashed_password_123' 
    });
    console.log(`Created User: ${user.username}`);


    const playlist = await Playlist.create({
      name: 'Gym Jams',
      user: user._id,    // REFERENCING ID
      songs: [song._id], // ARRAY OF IDs
      description: 'High energy tracks'
    });
    console.log(`Created Playlist: ${playlist.name}`);

    console.log('✅ Seeding Complete!');
    process.exit(0);


    } catch (error) {
        console.error('❌ Seeding Failed:', error);
    process.exit(1);
        
    }
}


seed();