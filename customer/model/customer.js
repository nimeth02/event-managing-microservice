const mongoose = require('mongoose');

// Define the user schema
const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobilePhone:{ type: String, unique: true },
  status:Number
});

// Create the user model
const Customer = mongoose.model('Customer', customerSchema);

// Export the user model
module.exports = Customer;