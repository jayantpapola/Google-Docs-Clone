const app = require("express")();
const express = require("express");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(require("./router/authRouter"));
app.use(require("./router/docRouter"));

const connectToDB = async () => {
  try {
    mongoose
      .connect(
        "mongodb+srv://Jayant:Papola@cluster0.5coi3.mongodb.net/GoogleDocs"
      )
      .then(() => {
        console.log("Connected to DB SuccessFully");
      });
  } catch (err) {
    console.log(err);
  }
};

// io.on('connection', (socket) => {
//   console.log('user connected');
//   socket.on('disconnect', function () {
//     console.log('user disconnected');
//   });
// })
app.get("/", function (req, res) {
  res.send("index.html");
});

server.listen(port, function () {
  connectToDB();
  console.log(`Listening on port ${port}`);
});
