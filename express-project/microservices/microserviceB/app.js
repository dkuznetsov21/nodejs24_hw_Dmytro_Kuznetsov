const express = require("express");
const queueController = require("./src/controllers/queue.controller");

const app = express();

app.use(express.json());

app.get("/", queueController.recieveMessage);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
