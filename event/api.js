const express =require("express");
const { eventList } = require("./data");
const { default: axios } = require("axios");
const { SubscribeMessage, CreateChannel } = require("./utils");
const router=express.Router()




router.get('/getEvent/:id',async (req,res)=>{
    console.log(req.params.id);
    let event=eventList.find((e)=>e._id == req.params.id)
    console.log(event)
    if(event){
        const { data } = await axios.get(`http://localhost:8081/customer/getCustomer/${event.customerId}`);
        console.log(data)
        event.customer=data
    }
res.json(event)
});

router.post('/createEvent',(req,res)=>{

} );

module.exports=router