const express = require('express');
const router = express.Router();
const Event = require('../model/event');
const { default: axios } = require('axios');
const { CUSTOMER_SERVICE } = require('../config');
const { PublishMessage } = require('../utils');
const { EventPay } = require('./eventcontroller');


router.post('/', async (req, res) => {
  try {
    console.log("create event");
const {name,status,amount,customerId}=req.body
    const newEvent = new Event({
      name,status,amount,paid:0,customerId,status:"opened"
    });
    const data=await newEvent.save() 
    console.log(data)
    if(data){
     // await axios.put(`http://localhost:8001/customer/activate/${customerId}`,{status:1})
     PublishMessage(CUSTOMER_SERVICE, JSON.stringify({status:1,customerId}))
      res.json(data);
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});



router.get('/:mobilePhone', async (req, res) => {
    try {
      console.log("event mobile");
        const mobilePhone = req.params.mobilePhone;

        const {data}=await axios.get(`http://localhost:8001/customer/${mobilePhone}`)
        console.log(data,mobilePhone);
        if(data){
          const event=await Event.find({customerId:data._id})
          res.json({event,data});
        }
        else{
          res.status(500).send('Event not found');
        }
        
      
      
    } catch (error) {

      console.error('Error creating user:', error);
      res.status(500).send('Internal Server Error');

    }
  });

router.put('/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const updateData = req.body; 
        console.log(id,updateData);
        const event = await Event.findOneAndUpdate({ _id:id },updateData,{ new: true });
        res.json(event);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Internal Server Error');
    }
  });



//   router.post('/eventPay/:eventId', async (req, res) => {
    
//     console.log("pay for event");
//     const eventId = req.params.eventId;
// const {amount}=req.body;
// try {
//   await EventPay(eventId,amount)
  
// } catch (error) {
//   console.log(error);
// }
  
//   });


// const EventPay=async(eventId,amount)=>{
//   try {
    
//       console.log("event pay");
//     const event = await Event.findOneAndUpdate({ _id:eventId }, { $inc: { paid: amount } },{ new: true });
          
//     if(event.amount == event.paid){
//       const updatedevent = await Event.findOneAndUpdate({ _id:event._id },{status:"closed"},{ new: true });
//       PublishMessage( CUSTOMER_SERVICE, JSON.stringify({status:-1,customerId:updatedevent.customerId}))  
//     }
   
       
//       } catch (error) {
//         console.error('Error creating user:', error);
//         res.status(500).send('Internal Server Error');
//       }
// }


module.exports = {router,EventPay};