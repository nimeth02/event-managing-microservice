const mongoose = require('mongoose');

// Define the user schema
const paymentSchema = new mongoose.Schema({

  customerId: {type: mongoose.Schema.Types.ObjectId},
  eventId: {type:mongoose.Schema.Types.ObjectId},
  amount:Number,
  description:String

});

// Create the user model
const Payment = mongoose.model('Payment', paymentSchema);

// Export the user model
module.exports = Payment;