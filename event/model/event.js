const mongoose = require('mongoose');

// Define the user schema
const eventSchema = new mongoose.Schema({
  name: String,
  customerId: {type: mongoose.Schema.Types.ObjectId},
  amount:Number,
  paid:Number,
  status:String
});

// Create the user model
const Event = mongoose.model('Event', eventSchema);

// Export the user model
module.exports = Event;