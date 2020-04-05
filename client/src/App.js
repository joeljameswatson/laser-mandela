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

  useEffect(() => {
    if ("DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", onDeviceMotion, false);
      socket = io();
    }
  }, []);



  function onDeviceMotion({ alpha, beta, gamma }) {
    setOrientation({ alpha, beta, gamma });
    const num = Math.abs(gamma)

    let state = 'stop';

    if (num > 10 && num<19 ) {

      // triangle
      state = 18
    } else if (num > 18 && num < 27){

      //square
      state = 26
    } else if (num > 26 && num < 49){

      // oval
      state = 48
    }  else  if (num > 48 && num < 80 ){

      // pentagon
      state = 78
    }

    socket.emit("orientation", { state });
  }

  return (
    <div className="App">
      <h1>Laser controller</h1>

      <div>direction (alpha): {Math.round(orientation.alpha)}</div>
      <div>front/back (beta): {Math.round(orientation.beta)}</div>
      <div>left/right (gamma): {Math.round(orientation.gamma)}</div>
      <br />
      <div>log: {log}</div>
    </div>
  );
}

export default App;
