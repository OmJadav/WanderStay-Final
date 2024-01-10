require('dotenv').config();
const { env } = require('process');

const mongoose = require("mongoose");

var mongoURL = process.env.MONGO_URL

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })

var connection = mongoose.connection

connection.on('error', () => {
    console.log("mongoDB connection failed")
})

connection.on('connected', () => {
    console.log('MongoDB connection Successful!!')
})

module.exports = mongoose