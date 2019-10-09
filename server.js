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

/////////  Set up motor controls ////////////
const motorHat = require("motor-hat")({
  address: 0x60,
  dcs: ["M1", "M2"]
});

motorHat.init();

const motor1 = motorHat.dcs[0];
const motor2 = motorHat.dcs[1];

function cb(err, result) {
  // if (err) {
  //   console.log("err: ", err);
  // } else {
  //   console.log("res: ", result);
  // }
}

io.sockets.on("connection", socket => {
  console.log("client connected");
  // change speed on orientation input
  motor1.run("fwd", cb);
  motor2.run("fwd", cb);

  socket.on("orientation", ({ alpha, beta, gamma }) => {
    if (gamma < 0) {
      motor1.setSpeed(0, cb);
      motor2.setSpeed(0, cb);
      console.log("set speed to 0");
    } else {
      motor1.setSpeed(50, cb);
      motor2.setSpeed(75, cb);
      console.log("set speed to 50/75");
    }
    // if (absGamma > 0 && absGamma < 20) {
    //   motor1.setSpeed(0, cb);
    //   motor2.setSpeed(0, cb);
    // } else if (absGamma > 20 && absGamma < 45) {
    //   motor1.setSpeed(25, cb);
    //   motor2.setSpeed(0, cb);
    // } else if (absGamma > 45 && absGamma < 60) {
    //   motor1.setSpeed(50, cb);
    //   motor2.setSpeed(75, cb);
    // } else if (absGamma > 60) {
    //   motor1.setSpeed(50, cb);
    //   motor2.setSpeed(100, cb);
    // }
  });
});
