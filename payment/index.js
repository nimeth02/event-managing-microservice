const cors=require('cors')
const { CreateChannel, RB } = require('./utils');
const express = require('express');
const db=require("./db")

const app = express();
app.use(cors())
app.use(express.json());

// app.use('/', (req,res,next) => {

//     return res.status(200).json({"msg": "Hello from shopping"})
// })

 const func=async()=>{
    //  return await CreateChannel()
    RB()
}

func()

app.get('/payment',(re,res)=>{
console.log("hello payment fuck");
res.send("hello i'm payment endpoint")
})

// const payment=require('./api');
const payment=require('./route/payment');
app.use('/payment',payment);

app.listen(8003, () => {
    console.log('Payment is Listening to Port 8003')
})