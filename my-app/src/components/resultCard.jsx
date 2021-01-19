import React, { Component } from "react";
import { Card } from "react-bootstrap";
import PopupW from "./popup";
import { MdDelete } from "react-icons/md";
import "./card.css";
import { Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  autoClose: 2000,
  position: "top-center",
  hideProgressBar: true,
  draggable: false,
  pauseOnHover: true,
  closeOnClick: true,
});

class ResultCard extends Component {
  renderCompanyTag = (com) => {
    if (com) {
      return (
        <span
          className={
            "px-1 ml-1 companyTag " +
            this.props.sectionClass(this.props.news.com)
          }
        >
          {this.props.news.com.toUpperCase()}
        </span>
      );
    }
  };

  removeFromFavorite = (event) => {
    event.stopPropagation();
    this.props.onRemove(this.props.news.id);
    this.notifyOff();
  };

  renderDeleteBtn = (data) => {
    if (data.com) {
      return <MdDelete onClick={this.removeFromFavorite} />;
    }
  };

  notifyOff = () =>
    toast("Removing " + this.props.news.title, {
      transition: Zoom,
      autoClose: 2000,
    });

  render() {
    return (
      <Card
        className="resultcard"
        onClick={() => this.props.onGetDetails(this.props.news)}
      >
        <Card.Body>
          <Card.Title>
            <i>{this.props.news.title}</i>
            <PopupW
              className="iconBtn"
              sharelink={this.props.news.sharelink}
              title={this.props.news.title}
            />
            {this.props.favorite ? (
              this.renderDeleteBtn(this.props.news)
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </Card.Title>

          <Card.Img src={this.props.news.image} />

          <Card.Text className="mt-2">
            <i>{this.props.news.date}</i>
            {this.props.favorite ? (
              this.renderCompanyTag(this.props.news.com)
            ) : (
              <React.Fragment></React.Fragment>
            )}
            <span
              className={
                "px-1 sectionTag " +
                this.props.sectionClass(this.props.news.section)
              }
            >
              {this.props.news.section.toUpperCase()}
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default ResultCard;
