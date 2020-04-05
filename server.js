require('dotenv').config();
const app = require("express")();
const fs = require("fs");
const express = require("express");
const https = require("https").createServer(
  {
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./cert.pem"),
    passphrase: process.env.SSL_PASSPHRASE
  },
  app
);

app.use(express.static("client/build"));

const io = require("socket.io").listen(https);
https.listen(3000, () => console.log(`listening on port: ${3000}`));

/////////  Set up motor controls ////////////
const motorHat = require("motor-hat")({
  address: 0x60,
  dcs: ["M1", "M2"]
});

motorHat.init();

const motor1 = motorHat.dcs[0];
const motor2 = motorHat.dcs[1];

function cb(err) {
  if (err) {
    console.log("error: ", err);
  }
}

io.sockets.on("connection", socket => {
  console.log("client connected");

  motor1.run("fwd", cb);
  motor2.run("fwd", cb);

  socket.on("orientation", ({ state }) => {
    console.log(state)
    motor1.setSpeed(0, cb);
      motor2.setSpeed(0, cb);
    // if (state === 'stop') {
    //   motor1.setSpeed(0, cb);
    //   motor2.setSpeed(0, cb);
    // } else{
    //   motor1.setSpeed(50, cb);
    //   // Adjust motor2 from 0% to 90% to create different patterns
    //   motor2.setSpeed(Math.round(state), cb);
    // }
  });
});
