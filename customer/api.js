const express =require("express");
const { customerList } = require("./data");
const { SubscribeMessage, CreateChannel } = require("./utils");
const router=express.Router()



router.get('/getCustomer/:id', (req,res)=>{
    const customer=customerList.find((e)=>e._id == req.params.id)
    console.log(customer)
    
res.json(customer)
});

router.post('/createCustomer',(req,res)=>{

} );

module.exports=router