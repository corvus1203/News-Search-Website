import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ResultCard from "./resultCard";
import Loading from "./loading";

class Search extends Component {
  state = { datag: null, datan: null, lastCom: this.props.com };

  componentDidMount() {
    this.props.toggleSwitch();
    this.makeRequest();
  }

  componentDidUpdate() {
    if (this.state.lastCom !== this.props.com) {
      this.makeRequest();
      this.setState({ lastCom: this.props.com });
    }
    if (this.state.keyword !== this.props.match.params.keyword) {
      this.makeRequest();
      this.setState({ keyword: this.props.match.params.keyword });
    }
  }

  makeRequest = () => {
    this.setState({
      datan: null,
      datag: null,
      lastCom: this.props.com,
    });
    let url =
      this.props.host +
      "guardian?section=search&" +
      "keyword=" +
      this.props.match.params.keyword;

    fetch(url).then((response) =>
      response.json().then((json) => {
        this.setState({ datag: json });
      })
    );
    url =
      this.props.host +
      "search/nytimes?keyword=" +
      this.props.match.params.keyword;

    fetch(url).then((response) =>
      response.json().then((json) => {
        this.setState({ datan: json });
      })
    );
  };

  renderContent = (datag, datan) => {
    if (datag.length === 0 && datan.length === 0) {
      return <p className="center-p">No Result</p>;
    }
    let data = [];
    let idx = 0;
    for (let i = 0; i < (datag.length || i < datan.length) && idx < 10; i++) {
      if (i < datag.length) data[idx++] = datag[i];
      if (i < datan.length) data[idx++] = datan[i];
    }
    return data.map((result) => (
      <ResultCard
        key={result.id}
        onGetDetails={this.props.handleGetDetails}
        onShare={this.props.onShare}
        sectionClass={this.props.sectionClass}
        news={result}
      />
    ));
  };

  render() {
    const { datan, datag } = this.state;
    return (
      <React.Fragment>
        {datan && datag ? (
          datag.length !== 0 && datan.length !== 0 ? (
            <h3 className="resultTitle">Results</h3>
          ) : (
            <React.Fragment />
          )
        ) : (
          <React.Fragment />
        )}
        <div className="cards-container">
          {datan && datag ? this.renderContent(datag, datan) : <Loading />}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Search);
