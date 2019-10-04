const app = require("express")();
const fs = require("fs");
const express = require("express");
const https = require("https").createServer(
  {
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./cert.pem"),
    passphrase: "abcd"
  },
  app
);

app.use(express.static("client/build"));

const io = require("socket.io").listen(https);
https.listen(3000, () => console.log(`listening on port: ${3000}`));

io.sockets.on("connection", socket => {
  console.log("client connected");
  socket.on("orientation", ({ alpha, beta, gamma }) => {
    console.log("orientation: ", alpha, beta, gamma);
  });
});
