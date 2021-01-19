import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ShareButton from "./shareButton";
import PageWithComments from "./pageWithComments";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import ReactTooltip from "react-tooltip";
import { Zoom, toast } from "react-toastify";
import Loading from "./loading";
import "react-toastify/dist/ReactToastify.css";
import "./card.css";

import { Element, animateScroll as scroll, scroller } from "react-scroll";

toast.configure({
  autoClose: 2000,
  position: "top-center",
  hideProgressBar: true,
  draggable: false,
  pauseOnHover: true,
  closeOnClick: true,
});

const remove = <FaRegBookmark style={{ color: "indianred" }} size="1.8em" />;
const save = <FaBookmark style={{ color: "indianred" }} size="1.8em" />;
const arrowUp = <IoIosArrowUp className="arrowBtn" size="20px" />;
const arrowDown = <IoIosArrowDown className="arrowBtn" size="20px" />;

class DetailCard extends Component {
  state = {
    lastBook: remove,
    book: remove,
    arrow: arrowDown,
  };

  componentDidMount() {
    this.props.toggleSwitch();
    let favorites = JSON.parse(localStorage.getItem("favorite"));
    let data = JSON.parse(localStorage.getItem("data"));
    if (favorites) {
      for (const fav of favorites) {
        if (fav.id === data.id) {
          this.setState({ lastBook: save, book: save });
          break;
        }
      }
    }
    console.log(this.props.match);
    console.log(this.props.location);

    let param =
      this.props.location.search.substr(1) || this.props.match.params.id;
    let idx = param.startsWith("guardian") ? 8 : 7;
    let com = param.substr(0, idx);
    let id = param.substr(idx);
    console.log(com);
    console.log(id);
    this.setState({
      data: null,
      id: id,
      com: com,
    });
    const url = this.props.host + "details/" + com + "?id=" + id;
    fetch(url).then((response) =>
      response.json().then((json) => {
        this.setState({ data: json });
      })
    );
  }

  componentWillUnmount() {
    if (this.state.lastBook !== this.state.book) {
      this.setState({ lastBook: this.state.book });
      let favorites = JSON.parse(localStorage.getItem("favorite")) || [];
      const data = JSON.parse(localStorage.getItem("data"));
      if (this.state.book === save) {
        favorites.push({
          id: data.id,
          data: data,
        });
      } else {
        for (let i = 0; i < favorites.length; i++) {
          const fav = favorites[i];
          if (fav.id === data.id) {
            favorites.splice(i, 1);
            break;
          }
        }
      }
      if (favorites.length === 0) {
        localStorage.clear();
      } else {
        localStorage.setItem("favorite", JSON.stringify(favorites));
      }
    }
  }

  notifyOn = () =>
    toast("Saving " + this.state.data.title, {
      transition: Zoom,
      autoClose: 2000,
    });

  notifyOff = () =>
    toast("Removing " + this.state.data.title, {
      transition: Zoom,
      autoClose: 2000,
    });

  bookmarkChange = () => {
    if (this.state.book === remove) {
      this.notifyOn();
      this.setState({ book: save });
    } else {
      this.notifyOff();
      this.setState({ book: remove });
    }
  };

  expand = () => {
    if (this.state.arrow === arrowDown) {
      scroller.scrollTo("expand", { smooth: true });
    }
    document
      .getElementById("description")
      .classList.toggle("block-with-text-6");
    if (this.state.arrow === arrowDown) {
      this.setState({ arrow: arrowUp });
    } else {
      scroll.scrollToTop();
      this.setState({ arrow: arrowDown });
    }
  };

  renderContent = (data) => {
    if (data.error) {
      return <h1>Error: {data.error}</h1>;
    }
    let boxid = decodeURIComponent(this.state.id);
    console.log("boxis: ", boxid);
    return (
      <React.Fragment>
        <div className="card flex-column detailcard m-3 p-4">
          <div>
            <h1>
              <i>{data.title}</i>
            </h1>
          </div>
          <div
            style={{
              display: "inline-block",
            }}
          >
            <p>
              <i>{data.date}</i>
            </p>
            <div
              style={{
                float: "right",
                marginLeft: "8%",
                marginRight: "2.5%",
                backgroundColor: "white",
                border: "none",
              }}
              onClick={this.bookmarkChange}
              data-tip="Bookmark"
              data-for="book"
            >
              {this.state.book}
            </div>
            <ReactTooltip effect="solid" id="book" />
            <div style={{ float: "right" }}>
              <ShareButton
                size="30"
                sharelink={data.sharelink}
                tooltipOff={false}
              />
            </div>
          </div>
          <div>
            <img src={data.image} alt="Card" />
          </div>
          <div id="description" className="block-with-text-6">
            {data.description}
          </div>
          <Element name="expand" />
          <div onClick={this.expand}>{this.state.arrow}</div>
        </div>
        <div className="p-3" style={{ fontSize: "20px" }}>
          <PageWithComments boxid={boxid} />
        </div>
      </React.Fragment>
    );
  };

  render() {
    console.log("detail");
    const { data } = this.state;
    return (
      <div id="detail-container">
        {data ? this.renderContent(data) : <Loading />}
      </div>
    );
  }
}

export default withRouter(DetailCard);
