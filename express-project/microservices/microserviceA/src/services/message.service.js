const amqp = require("amqplib");

exports.sendToQueue = async (message) => {
    try {
        const conn = await amqp.connect("amqp://localhost");
        const channel = await conn.createChannel();
        const queue = "test-queue";

        await channel.assertQueue(queue, { durable: false });

        channel.sendToQueue(queue, Buffer.from(message), {}, (err) => {
            if (err) {
                console.error("Failed to send message:", err);
            } else {
                console.log(`Sent message: ${message}`);
            }

            channel.close().then(() => conn.close());
        });
    } catch (err) {
        console.error("Error in service:", err);
        throw err;
    }
};

