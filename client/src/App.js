import React, { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

function App(props) {
  const [orientation, setOrientation] = useState({
    alpha: "",
    beta: "",
    gamma: ""
  });

  const [log, setLog] = useState("N/A");
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if ("DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", onDeviceMotion, false);
      socket = io();
    }
  }, []);

  function onDeviceMotion({ alpha, beta, gamma }) {
    if(!isActive) {
      socket.emit("orientation", { speed: 0 });
      return
    }

    const num = gamma
    let speed = 0

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

    setOrientation({ alpha, beta, gamma });

    socket.emit("orientation", { speed });
  }

  return (
    <div className="App">
      <h1>Laser controller</h1>

      <div>direction (alpha): {Math.round(orientation.alpha)}</div>
      <div>front/back (beta): {Math.round(orientation.beta)}</div>
      <div>left/right (gamma): {Math.round(orientation.gamma)}</div>
      <br />
      <div>log: {log}</div>
      <button onClick={() => setIsActive(!isActive)}>
        <span>{isActive ? 'STOP' : 'START'}</span>
      </button>
    </div>
  );
}

export default App;
