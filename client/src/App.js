import React, { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;
let lastSpeed;

function App(props) {
  // const [orientation, setOrientation] = useState({
  //   alpha: "",
  //   beta: "",
  //   gamma: ""
  // });

  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if ("DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", onDeviceMotion, false);
      socket = io();
    }
  }, []);

  function onDeviceMotion({ alpha, beta, gamma }) {
    const num = Math.round(gamma)
    let speed = 0

    if(isActive) {
      if (num > -90 && num < -80) {
        // triangle
        speed = 18
      } else if (num > -80 && num < -65) {
        // oval
        speed = 48
      } else if (num > -65 && num < 65) {
        // stop
        speed = 0
      } else if (num > 65 && num < 80) {
        //square
        speed = 26
      } else if (num > 80) {
        // pentagon
        speed = 78
      }
    }

    // setOrientation({ alpha, beta, gamma });

    if(speed !== lastSpeed) {
      socket.emit("orientation", { speed });
      lastSpeed = speed
    }
  }

  return (
    <div className="App">
      <h1>Laser controller</h1>

      {/* <div>direction (alpha): {Math.round(orientation.alpha)}</div>
      <div>front/back (beta): {Math.round(orientation.beta)}</div>
      <div>left/right (gamma): {Math.round(orientation.gamma)}</div>
      <br />
      */}
      <button onClick={() => setIsActive(!isActive)}>{isActive ? 'STOP' : 'START'}</button>
    </div>
  );
}

export default App;
