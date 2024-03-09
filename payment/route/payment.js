const express = require('express');
const router = express.Router();
const Payment = require('../model/payment');
const { default: axios } = require('axios');
const { PublishMessage } = require('../utils');
const { EVENT_SERVICE } = require('../config');


router.post('/', async (req, res) => {
  try {
    console.log("create payment");
    const {description,amount,eventId,customerId}=req.body
    const newEvent = new Payment({
      description,amount,eventId,customerId
    });
    const payment=await newEvent.save()
if(payment){
 // const {data}=await axios.post(`http://localhost:8002/event/eventPay/${eventId}`,{amount})
  PublishMessage( EVENT_SERVICE, JSON.stringify({amount,eventId}))
  res.json(payment);
}
else{
  res.status(500).send('No payment found');
}

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});



router.get('/:mobilePhone', async (req, res) => {
    try {
        const mobilePhone = req.params.mobilePhone;
        // const {data}=await axios.get(`http://localhost:8001/customer/${mobilePhone}`)
       // if(data){
          const {data}=await axios.get(`http://localhost:8002/event/${mobilePhone}`)
         
          console.log("all events",data.event);
          const response = await Promise.all(
            data.event.map(async (e) => {
              const payment = await Payment.find({ eventId: e._id });
              e.payment = payment;
              return e;
            })
          );
            res.json({response});  
        // }
        // else{
        //   res.status(500).send('Customer not found');
        // }
        
      
      
    } catch (error) {

      console.error('Error creating user:', error.message);
      res.status(500).send('Internal Server Error');

    }
  });










module.exports = router;