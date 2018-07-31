import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      alpha: "",
      beta: "",
      gamma: ""
    };
  }

  componentDidMount() {
    if ("DeviceOrientationEvent" in window) {
      // document.getElementById("moApi").innerHTML = "Device Motion API";

      // var onDeviceMotion = function(eventData) {
      //   accelerationHandler(eventData.acceleration, "moAccel");
      //   accelerationHandler(
      //     eventData.accelerationIncludingGravity,
      //     "moAccelGrav"
      //   );
      //   rotationHandler(eventData.rotationRate);
      //   intervalHandler(eventData.interval);
      // };

      window.addEventListener("deviceorientation", this.onDeviceMotion, false);
    }
  }

  log = str => {
    this.setState({ log: str });
  };

  onDeviceMotion = ({ alpha, beta, gamma }) => {
    this.setState({ alpha, beta, gamma });
  };

  render() {
    return (
      <div className="App">
        <h1>Laser Mandala</h1>
        <div>log: {this.state.log}</div>
        <br />
        motion:
        <div>direction: {Math.round(this.state.alpha)}</div>
        <div>front/back: {Math.round(this.state.beta)}</div>
        <div>left/right: {Math.round(this.state.gamma)}</div>
      </div>
    );
  }
}

export default App;
