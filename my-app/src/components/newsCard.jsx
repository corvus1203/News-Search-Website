import React, { Component } from "react";
import PopupW from "./popup";
import "./card.css";

class NewsCard extends Component {
  render() {
    return (
      <div
        className="card flex-md-row newscard mx-3 my-2"
        onClick={() => this.props.onGetDetails(this.props.news)}
      >
        <div className="flex-column cardImg-container">
          <img src={this.props.news.image} alt="Card" className="m-3" />
        </div>

        <div className="d-flex flex-column cardText-container">
          <div className="card-body w-100">
            <h5 className="card-title">
              <i>{this.props.news.title}</i>
              <PopupW
                className="iconBtn"
                sharelink={this.props.news.sharelink}
                title={this.props.news.title}
              />
            </h5>
            <div className="card-text block-with-text mb-3">
              {this.props.news.description}
            </div>
            <i>{this.props.news.date}</i>
            <span
              className={
                "px-2 sectionTag " +
                this.props.sectionClass(this.props.news.section)
              }
            >
              {this.props.news.section.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsCard;
