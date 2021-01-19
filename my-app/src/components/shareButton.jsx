import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon
} from "react-share";
import "./ShareButton.css";

class ShareButton extends Component {
  render() {
    const shareUrl = this.props.sharelink;
    const hashtag = "#CSCI_571_NewsApp";
    let hashtags = ["CSCI_571_NewsApp"];

    return (
      <div className="Demo__container" style={{ display: "inline" }}>
        <div className="Demo__some-network">
          <FacebookShareButton
            url={shareUrl}
            hashtag={hashtag}
            className="Demo__some-network__share-button"
            data-tip="Facebook"
          >
            <FacebookIcon size={this.props.size} round />
          </FacebookShareButton>
        </div>

        <div className="Demo__some-network" id="twitterButton">
          <TwitterShareButton
            // title={hashtag}
            url={shareUrl}
            hashtags={hashtags}
            className="Demo__some-network__share-button"
            data-tip="Twitter"
          >
            <TwitterIcon size={this.props.size} round />
          </TwitterShareButton>
        </div>

        <div className="Demo__some-network">
          <EmailShareButton
            url={shareUrl}
            subject={hashtag}
            className="Demo__some-network__share-button"
            data-tip="Email"
          >
            <EmailIcon size={this.props.size} round />
          </EmailShareButton>
        </div>
        <ReactTooltip
          place="top"
          effect="solid"
          disable={this.props.tooltipOff}
        />
      </div>
    );
  }
}

export default ShareButton;
