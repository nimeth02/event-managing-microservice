const express =require("express");
const { paymentList} = require("./data");
const { default: axios } = require("axios");
const { PublishMessage, CreateChannel } = require("./utils");
const { CUSTOMER_SERVICE } = require("./config");
const router=express.Router()

router.get('/getPayment/:id', async(req,res)=>{
    console.log(req.params.id);
    let payment=paymentList.find((e)=>e._id == req.params.id)
    console.log(payment)
    if(payment){
        const { data } = await axios.get(`http://localhost:8081/customer/getCustomer/${payment.customerId}`);
        console.log(data)
        payment.customer=data 
        const customerdata={
                _id:"700",
                name:"nimeth",
                mobile:"0705485236"   
        }  
        console.log("publish customer by payment")
        const channel = await CreateChannel();
        PublishMessage(channel, CUSTOMER_SERVICE, JSON.stringify(customerdata)); 
    }
    if(payment){
        const { data } = await axios.get(`http://localhost:8081/event/getEvent/${payment.eventId}`);
        console.log(data)
        payment.event=data       
    }
res.json(payment)
});

router.post('/createPayment',(req,res)=>{

} );

module.exports=router