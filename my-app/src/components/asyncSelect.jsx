import React, { Component } from "react";
import AsyncSelect from "react-select/async";

export default class WithCallbacks extends Component {
  state = {
    selectedOption: null,
    lastRun: null,
    timer: null,
  };

  mapOptionsToValues = (options) => {
    return options.map((option) => ({
      value: option.displayText,
      label: option.displayText,
    }));
  };

  makeRequest = (inputValue, callback) => {
    this.setState({ lastRun: new Date().getTime() });
    try {
      fetch(
        `https://api.bing.microsoft.com/v7.0/suggestions?q=${inputValue}`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": "",
          },
        }
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            const results = data.suggestionGroups[0].searchSuggestions;
            callback(this.mapOptionsToValues(results));
          });
        }
      });
    } catch (error) {
      console.error(`Error fetching search ${inputValue}`);
    }
  };

  getOptions = (inputValue, callback) => {
    if (!inputValue) {
      return callback([]);
    }
    const now = new Date().getTime();
    if (!this.state.lastRun || now - this.state.lastRun >= 1500) {
      this.makeRequest(inputValue, callback);
    } else {
      if (this.state.timer) {
        clearTimeout(this.state.timer);
      }
      let timer = setTimeout(() => {
        this.makeRequest(inputValue, callback);
      }, this.state.lastRun + 2000 - now);
      this.setState({ timer: timer });
    }
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption: selectedOption });
    this.props.onSubmit(selectedOption.value);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.clear) {
      this.setState({ selectedOption: null });
    }
  }

  render() {
    return (
      <AsyncSelect
        name="keyword"
        placeholder="Enter keyword..."
        value={this.state.selectedOption}
        loadOptions={this.getOptions}
        onChange={this.handleChange}
        noOptionsMessage={() => "No match"}
      />
    );
  }
}
