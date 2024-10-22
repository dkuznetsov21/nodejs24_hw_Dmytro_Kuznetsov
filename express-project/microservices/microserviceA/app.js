const express = require("express");
const messageController = require("./src/controllers/message.controller");

const app = express();

app.use(express.json());

app.post("/message", messageController.sendMessage);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
