import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alpha: "",
      beta: "",
      gamma: "",
      data: null
    };
  }

  componentDidMount() {
    if ("DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", this.onDeviceMotion, false);
    }

    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

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
        <br />
        <h2>Server res</h2>
        <div>{this.state.data}</div>
      </div>
    );
  }
}

export default App;
