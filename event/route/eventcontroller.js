const { CUSTOMER_SERVICE } = require("../config");
const Event = require("../model/event");
const { PublishMessage } = require("../utils");

module.exports.EventPay=async(eventId,amount)=>{
 
      
        console.log("event pay");
      const event = await Event.findOneAndUpdate({ _id:eventId }, { $inc: { paid: amount } },{ new: true });
            
       if(event.amount == event.paid){
        const updatedevent = await Event.findOneAndUpdate({ _id:event._id },{status:"closed"},{ new: true });
        PublishMessage( CUSTOMER_SERVICE, JSON.stringify({status:-1,customerId:event.customerId}))  
      }
     
       
  }


  module.exports.Activate=async(status,customerId)=>{
    PublishMessage(CUSTOMER_SERVICE, JSON.stringify({status:1,customerId}))
      
  }