const express = require('express')
var mongoose = require('mongoose');
const app = express()
const port = 8000
const cors = require('cors');
const PolicyRoute = require("./routes/PolicyRoute");

mongoose.connect("mongodb://0.0.0.0:27017/task");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Api is running");
})

app.use("/api/v1/policy", PolicyRoute);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

process.on('SIGINT', async function () {
    await mongoose.disconnect();
    process.exit(0)
});