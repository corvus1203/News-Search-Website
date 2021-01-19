import React, { Component } from "react";
import Switch from "react-switch";

class SwitchBtn extends Component {
  constructor() {
    super();
    this.state = { checked: true };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    this.props.onSwitch();
  }

  componentDidMount() {
    this.setState({ checked: this.props.com === "guardian" });
  }

  render() {
    return (
      <label htmlFor="material-switch">
        <Switch
          checked={this.state.checked}
          onChange={this.handleChange}
          onColor="#0e94f6"
          offColor="#d9d8da"
          onHandleColor="#f8f9fa"
          handleDiameter={20}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={40}
          className="react-switch"
          id="material-switch"
        />
      </label>
    );
  }
}

export default SwitchBtn;
