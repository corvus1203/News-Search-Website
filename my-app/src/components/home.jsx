import React, { Component } from "react";
import NewsCard from "./newsCard";
import { withRouter } from "react-router-dom";
import Loading from "./loading";
import "./home.css";

class Home extends Component {
  state = {
    data: null,
    lastCom: localStorage.getItem("com") || "guardian",
    lastSection: "home",
  };

  componentDidMount() {
    if (this.props.match.url.length === 1) {
      this.props.history.push({ pathname: "/home" });
    }
    this.props.toggleSwitch();
    this.makeRequest();
  }

  componentDidUpdate() {
    if (this.state.lastCom !== this.props.com) {
      this.makeRequest();
      this.setState({ lastCom: this.props.com });
    } else if (this.props.match.url.substr(1) !== this.state.lastSection) {
      this.makeRequest();
      this.setState({ lastSection: this.props.match.url.substr(1) });
    }
  }

  makeRequest = () => {
    this.setState({
      data: null,
      lastCom: this.props.com,
      lastSection: this.props.match.url.substr(1),
    });
    const section = this.props.match.url.substr(1) || "home";
    const url = this.props.host + this.props.com + "?section=" + section;
    fetch(url).then((response) =>
      response.json().then((json) => {
        this.setState({ data: json });
      })
    );
  };

  renderContent = (data) => {
    if (data.error) {
      return <h1>Error: {data.error}</h1>;
    }
    return data.map((news) => (
      <NewsCard
        key={news.id}
        onShare={this.props.onShare}
        onGetDetails={this.props.handleGetDetails}
        news={news}
        sectionClass={this.props.sectionClass}
      />
    ));
  };

  render() {
    console.log("home");
    const { data } = this.state;
    return (
      <div className="cards-container py-3">
        {data ? this.renderContent(data) : <Loading />}
      </div>
    );
  }
}

export default withRouter(Home);
