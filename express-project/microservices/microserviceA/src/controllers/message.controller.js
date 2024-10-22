const messageService = require("../services/message.service");

exports.sendMessage = async (req, res) => {
    try {
        const message = req.body.message;
        await messageService.sendToQueue(message);
        res.send(`Sent message: ${message}`);
    } catch (err) {
        console.error("Error in controller:", err);
        res.status(500).send("Failed to send message");
    }
};
