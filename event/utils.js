const { EXCHANGE_NAME, MSG_QUEUE_URL, EVENT_SERVICE, CUSTOMER_SERVICE } = require("./config");
const amqplib=require('amqplib');
const Event = require("./model/event");

let channel
const CreateChannel = async () => {
    try {
      console.log("channel event")
      const connection = await amqplib.connect(MSG_QUEUE_URL);
        channel = await connection.createChannel();
      await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true });
      // console.log(channel)
      return channel;
    } catch (err) {
      throw err;
    }
  };
  
PublishMessage = async(service, msg) => {
    try {
      await channel.publish(EXCHANGE_NAME, service, Buffer.from(msg),{ persistent: true });
      console.log("event Sent: ", msg);
    } catch (err) {
      throw err;
    }
  };
  
  const SubscribeMessage = async (channel,service) => {
    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
    const q = await channel.assertQueue("", { exclusive: true });
    console.log(`subscribe  messages  event queue: ${q.queue}`);
  
    channel.bindQueue(q.queue, EXCHANGE_NAME, EVENT_SERVICE);
  
    channel.consume(
      q.queue,
      async(msg) => {
        if (msg.content) {
          console.log("the message is:", msg.content.toString());
          const data = JSON.parse(msg.content.toString());
          console.log(data);
          const {eventId,amount}=data
          if(data){
            console.log("event pay");
            // const event = await Event.findOneAndUpdate({ _id:eventId }, { $inc: { paid: amount } },{ new: true });
                  
            //  if(event.amount == event.paid){
            //   const updatedevent = await Event.findOneAndUpdate({ _id:event._id },{status:"closed"},{ new: true });
            //   PublishMessage( CUSTOMER_SERVICE, JSON.stringify({status:-1,customerId:event.customerId}))  
            // }
            EventPay(data.eventId,data.amount)
          }
         
          // service.SubscribeEvents(msg.content.toString());
        }
        console.log("[X] received");
      },
      {
        noAck: true,
      }
    );
  };
  
  const RB=async()=>{
    const channel=await CreateChannel();
    SubscribeMessage(channel,"EVENT_SERVICE")
  }

const EventPay=async(eventId,amount)=>{
 
    try {
      console.log("event pay");
      const event = await Event.findOneAndUpdate({ _id:eventId }, { $inc: { paid: amount } },{ new: true });
            
       if(event.amount == event.paid){
        const updatedevent = await Event.findOneAndUpdate({ _id:event._id },{status:"closed"},{ new: true });
        PublishMessage( CUSTOMER_SERVICE, JSON.stringify({status:-1,customerId:event.customerId}))  
      }
    } catch (error) {
      console.log(error)
    }  
  
 
   
}

  module.exports={RB,PublishMessage}
 