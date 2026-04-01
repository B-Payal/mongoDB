require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Song = require('../models/Song');
const Book = require('../models/Book');

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

app.post('/api/books' , async (req,res)=>{
    try{
    const {title , author , isbn , price, quantity} = req.body;
    if(!title|| !author || !isbn || !price|| !quantity){
        return res.status(400).json({error:err.message})


    }
    const newBook = new Book({
        title:title.trim(),
        author:author.trim(),
        isbn:isbn.trim(),
        price:price,
        quantity:quantity

    })
    const saved = await newBook.save();
     return res.status(201).json({
      message: 'Book created successfully',
      data: saved,
    });}catch(error){
        // 🔴 Duplicate ISBN
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'ISBN already exists',
      });
    }

    // 🔴 Mongoose validation error
    if (error.name === 'ValidationError') {
      let errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }

      return res.status(400).json({
        message: 'Validation error',
        errors,
      });
    }

    console.log(error)
    // 🔴 Unknown error
    return res.status(500).json({
      message: 'Internal server error',
    });

    }
})

app.listen(3000 , ()=>{
    console.log("server http://localhost:3000");
});