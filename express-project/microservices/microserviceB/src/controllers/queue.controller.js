const queueService = require("../services/queue.service");

exports.recieveMessage = async (req, res) => {
    try {
        await queueService.receiveFromQueue();
        res.send("Established queue");
    } catch (err) {
        console.error("Error in controller:", err);
        res.status(500).send("Failed to establish queue");
    }
};
