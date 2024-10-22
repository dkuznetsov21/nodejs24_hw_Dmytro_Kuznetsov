const amqp = require("amqplib");

exports.receiveFromQueue = async () => {
    try {
        const conn = await amqp.connect("amqp://localhost");
        const channel = await conn.createChannel();
        const queue = "test-queue";

        await channel.assertQueue(queue, { durable: false });
        console.log("Waiting for messages to pass in...");

        await channel.consume(
            queue,
            (msg) => {
                if (msg !== null) {
                    console.log(`Received message: ${msg.content.toString()}`);
                }
            },
            {noAck: true}
        );
    } catch (err) {
        console.error("Error in service:", err);
        throw err;
    }
};
