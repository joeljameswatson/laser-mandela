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
   
    // const num = Math.abs(gamma)
    const num = gamma

    let s = 'stop';

    if (num > 60 && num < 65 ) {

      // triangle
      s = 18
    } else if (num > 65 && num < 75){

      //square
      s = 26
    } else if (num > 75 && num < 85){

      // oval
      s = 48
    }  else  if (num > 85 && num < 90 ){

      // pentagon
      s = 78
    }

    setOrientation({ alpha, beta, gamma });

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
