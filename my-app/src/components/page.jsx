import React, { Component } from "react";
import NavBar from "./navbar";
import { Route, Switch, withRouter } from "react-router-dom";
import { generatePath } from "react-router";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

import Home from "./home";
import DetailCard from "./detailCard";
import Search from "./search";
import Favorite from "./favorite";

const host =
  "http://yuntangh-web.us-east-1.elasticbeanstalk.com/";

const bookmarkFrame = (
  <React.Fragment>
    <FaRegBookmark style={{ color: "white" }} />
  </React.Fragment>
);

const bookmarkFilled = (
  <React.Fragment>
    <FaBookmark style={{ color: "white" }} />
  </React.Fragment>
);

class Page extends Component {
  componentDidMount() {
    const com = localStorage.getItem("com") || "guardian";
    this.setState({ com: com });
  }

  refresh = () => {
    const curPath = this.props.history.location.pathname;
    this.props.history.push({ pathname: "/re" });
    this.props.history.replace({ pathname: curPath });
  };

  toggleSwitch = () => {
    let path = this.props.history.location.pathname;
    if (path.startsWith("/favorite")) {
      this.setState({ bookmark: bookmarkFilled });
    } else {
      this.setState({ bookmark: bookmarkFrame });
    }
    if (
      path.startsWith("/search") ||
      path.startsWith("/detail") ||
      path.startsWith("/favorite")
    ) {
      this.setState({ showSwitch: "hideSwitch" });
    } else {
      this.setState({ showSwitch: "" });
    }
  };

  handleSwitch = () => {
    if (this.state.com === "guardian") {
      this.setState({ com: "nytimes" }, this.refresh);
    } else {
      this.setState({ com: "guardian" }, this.refresh);
    }
    localStorage.setItem("com", this.state.com);
  };

  handleGetDetails = (data) => {
    console.log("getDetail");
    localStorage.setItem("data", JSON.stringify(data));
    let path = "detail?:id";
    if (this.props.history.location.pathname.startsWith("/search")) {
      path = "../" + path;
    }
    this.props.history.push({
      pathname: generatePath(path, { id: data.com + data.id }),
    });
  };

  handleSearch = (key) => {
    let path = "search/:keyword";
    if (this.props.history.location.pathname.startsWith("/search")) {
      path = "../" + path;
    } else if (this.props.history.location.pathname.startsWith("/detail")) {
      path = "../../" + path;
    }
    const keyword = key || document.getElementById("searchForm").keyword.value;
    this.props.history.push({
      pathname: generatePath(path, { keyword: keyword }),
    });
  };

  sectionClass = (section) => {
    switch (section) {
      case "sport":
      case "sports":
        return "sport";
      case "world":
      case "politics":
      case "business":
      case "technology":
      case "guardian":
      case "nytimes":
        return section;
      default:
        return "other";
    }
  };

  state = {
    host: host,
    com: localStorage.getItem("com") || "guardian",
    section: "home",
    showSwitch: "",
    bookmark: bookmarkFrame,
    toggleSwitch: this.toggleSwitch,
    handleGetDetails: this.handleGetDetails,
    sectionClass: this.sectionClass,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname.startsWith("/search")) {
      this.setState({ clear: false });
    } else {
      this.setState({ clear: true });
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar
          com={this.state.com}
          showSwitch={this.state.showSwitch}
          bookmark={this.state.bookmark}
          clear={this.state.clear}
          onSwitch={this.handleSwitch}
          onSearch={this.handleSearch}
        />
        <Switch>
          <Route
            path="/detail?:id"
            render={() => <DetailCard {...this.state} />}
          ></Route>
          <Route
            path="/detail"
            render={() => <DetailCard {...this.state} />}
          ></Route>
          <Route
            path="/favorite"
            render={() => <Favorite {...this.state} />}
            exact
          ></Route>
          <Route
            path="/home"
            render={() => <Home {...this.state} />}
            exact
          ></Route>
          <Route
            path="/world"
            render={() => <Home {...this.state} />}
            exact
          ></Route>
          <Route
            path="/politics"
            render={() => <Home {...this.state} />}
            exact
          ></Route>
          <Route
            path="/business"
            render={() => <Home {...this.state} />}
            exact
          ></Route>
          <Route
            path="/technology"
            render={() => <Home {...this.state} />}
            exact
          ></Route>
          <Route
            path="/sports"
            render={() => <Home {...this.state} />}
            exact
          ></Route>
          <Route
            path="/search/:keyword"
            render={() => <Search {...this.state} />}
          ></Route>
          <Route path="/" render={() => <Home {...this.state} />} exact />
          {/* <Route render={() => <DetailCard {...this.state} />} /> */}
        </Switch>
      </div>
    );
  }
}

export default withRouter(Page);
