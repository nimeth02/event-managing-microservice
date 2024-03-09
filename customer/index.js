const express = require('express');
const { CreateChannel, SubscribeMessage, RB } = require('./utils');
const db=require("./db")

const app = express();
app.use(express.json());


const func=async()=>{
    // const channel =await CreateChannel()
    // SubscribeMessage(channel, "CUSTOMER_SERVICE")
    RB()
}
func()


const {router}=require('./route/customer');
app.use('/customer',router)

app.listen(8001, () => {
    console.log('Customer is Listening to Port 8001')
})