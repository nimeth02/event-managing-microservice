const express = require('express');
const db=require("./db")
const { CreateChannel, SubscribeMessage, RB } = require('./utils');
const app = express();

app.use(express.json());

// app.use('/', (req,res,next) => {
//     return res.status(200).json({"msg": "Hello from product"})
// })

const func=async()=>{
    // const channel =await CreateChannel()
    // SubscribeMessage(channel, "EVENT_SERVICE")
    RB()
}
func()

const {router}=require('./route/event.js');
app.use('/event',router)

app.listen(8002, () => {
    console.log('Event is Listening to Port 8002')
})