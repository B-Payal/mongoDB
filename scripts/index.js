require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Song = require('../models/Song');

const mongodbURI = process.env.MONGODB_URI;

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongodbURI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.get('/api/songs' , async (req,res)=>{
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
        
    } catch (error) {
         res.status(500).json({ error: error.message });
        
    }
})


app.get('/api/songs/:id' , async (req,res) =>{
    try {
        const song = await Song.findById(req.params.id);

        if (!song) {
            return res.status(404).json({ message: "Not Found" });
        }
        
        res.status(200).json(song);
        
    } catch (err){
        if (err.name === 'CastError') {
             return res.status(400).json({ message: "Invalid ID format" });
        }
        res.status(500).json({ error: err.message });
        
    }
})

app.listen(3000 , ()=>{
    console.log("server http://localhost:3000");
});