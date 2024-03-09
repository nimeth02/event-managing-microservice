const { EXCHANGE_NAME, MSG_QUEUE_URL, CUSTOMER_SERVICE } = require("./config");
const amqplib=require('amqplib');
const { activate } = require("./route/customer");

const CreateChannel = async () => {
    try {
      const connection = await amqplib.connect(MSG_QUEUE_URL);
      const channel = await connection.createChannel();
      await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true, deadLetterExchange: 'my-dlx', });
      return channel;
    } catch (err) {
      throw err;
    }
  };
  

const SubscribeMessage = async (channel) => {
    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
    const q = await channel.assertQueue("online_store", { exclusive: false });
    console.log(`subscribe  messages customer queue: ${q.queue}`);
  
    channel.bindQueue(q.queue, EXCHANGE_NAME, CUSTOMER_SERVICE);
  
    channel.consume(
      q.queue,
      (msg) => {
        if (msg.content) {
          console.log("customer message is:", msg.content.toString());
          const data = JSON.parse(msg.content.toString());
          console.log(data);
           activate(data.customerId,data.status,)
        }
        console.log("[X] received");
      },
      {
        noAck: true,
      }
    );
  };
  

  module.exports.RB=async()=>{
    const channel=await CreateChannel();
    // event to customer
    SubscribeMessage(channel, "CUSTOMER_SERVICE")
  }