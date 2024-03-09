const mongoose = require('mongoose');


const mongoURI = 'mongodb+srv://20011002nimeth:20011002nimeth@cluster0.ro8pbdu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(mongoURI);

const db = mongoose.connection;

module.exports = db;