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
motor1.run("fwd", cb);
motor2.run("fwd", cb);

function cb(err, result) {
  if (err) {
    console.log("err: ", err);
  } else {
    console.log("res: ", result);
  }
}

io.sockets.on("connection", socket => {
  console.log("client connected");

  // change speed on orientation input
  socket.on("orientation", ({ alpha, beta, gamma }) => {
    let absAlpha = Math.abs(alpha);
    if (absAlpha > 0 && absAlpha < 20) {
      motor1.setSpeed(0, cb);
      motor2.setSpeed(0, cb);
    } else if (absAlpha > 20 && absAlpha < 45) {
      motor1.setSpeed(25, cb);
      motor2.setSpeed(0, cb);
    } else if (absAlpha > 45 && absAlpha < 60) {
      motor1.setSpeed(50, cb);
      motor2.setSpeed(75, cb);
    } else if (absAlpha > 60) {
      motor1.setSpeed(50, cb);
      motor2.setSpeed(100, cb);
    }
  });
});
