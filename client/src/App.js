import React, { useState, useEffect } from "react";

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
    }
  }, []);

  function onDeviceMotion({ alpha, beta, gamma }) {
    setOrientation({ alpha, beta, gamma });
  }

  return (
    <div className="App">
      <h1>Laser controller</h1>

      <div>direction: {Math.round(orientation.alpha)}</div>
      <div>front/back: {Math.round(orientation.beta)}</div>
      <div>left/right: {Math.round(orientation.gamma)}</div>
      <br />
      <div>log: {log}</div>
    </div>
  );
}

export default App;
