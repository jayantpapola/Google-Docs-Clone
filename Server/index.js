const app = require("express")();
const express = require("express");
const cors = require("cors");
app.use(cors({ origin: "*" }));
const server = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
require("dotenv").config();
const mongoose = require("mongoose");

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(require("./router/authRouter"));
app.use(require("./router/docRouter"));

app.get("/", (req, res) => {
  res.send("<b>Jayant</b>: Hi There");
});
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

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("DocContent", (msg) => {
    socket.broadcast.emit(`Editor-${msg.docId}`, msg.data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
app.get("/", function (req, res) {
  res.send("index.html");
});

server.listen(port, function () {
  connectToDB();
  console.log(`Listening on port ${port}`);
});
