const express = require('express');
const router = express.Router();
const Customer = require('../model/customer');


router.post('/', async (req, res) => {
  try {
    console.log("create customer");
const {name,email,mobilePhone}=req.body
    const newCustomer = new Customer({
        name,email,status:0,mobilePhone
    });
    const data=await newCustomer.save();

    res.json(data);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});



router.get('/:mobilePhone', async (req, res) => {
    try {
        const mobilePhone = req.params.mobilePhone;
        console.log(mobilePhone);
      const customer=await Customer.findOne({mobilePhone:mobilePhone})
  
      res.json(customer);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Internal Server Error');
    }
  });


router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body; 
        console.log(id,updateData);
        const customer = await Customer.findOneAndUpdate({ _id:id },updateData,{ new: true });
        res.json(customer);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Internal Server Error');
    }
  });



router.put('/activate/:customerId', async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const {status} = req.body; 
        console.log(customerId,status);
        activate(customerId,status)
       
        res.json("true");
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Internal Server Error');
    }
  });

 const activate=async(customerId,status)=>{
  console.log("activate function",customerId,status);
  try {
     await Customer.findOneAndUpdate({_id:customerId},{ $inc: { status : status } },{ new: true });

  } catch (error) {
    console.log(error);
  }
 }

module.exports = {router,activate};