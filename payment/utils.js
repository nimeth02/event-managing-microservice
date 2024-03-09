const { EXCHANGE_NAME, MSG_QUEUE_URL } = require("./config");
const amqplib=require('amqplib')

let channel

const CreateChannel = async () => {
    try {
      console.log("payment channel");
      const connection = await amqplib.connect(MSG_QUEUE_URL);
      channel = await connection.createChannel();
      await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true, deadLetterExchange: 'my-dlx', });
      return channel;
    } catch (err) {
      throw err;
    }
  };
  
  module.exports.PublishMessage =async ( service, msg) => {
    try {
      await channel.publish(EXCHANGE_NAME, service, Buffer.from(msg),{ persistent: true });
      console.log("payment Sent: ", msg);
    } catch (err) {
      throw err;
    }
  };
  
 

  module.exports.RB=async()=>{
    const channel=await CreateChannel()
  }
 