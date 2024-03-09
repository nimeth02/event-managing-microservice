const express = require('express');
const proxy = require("express-http-proxy");
const cors=require('cors')
const app = express();

app.use(express.json());
app.use(cors())

app.use("/customer", proxy("http://localhost:8001"));
app.use("/event", proxy("http://localhost:8002"));
app.use("/payment", proxy("http://localhost:8003"));


app.listen(8000, () => {
    console.log('Products is Listening to Port 8000')
})