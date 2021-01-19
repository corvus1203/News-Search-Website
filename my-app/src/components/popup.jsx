import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./Popup.css";
import ShareButton from "./shareButton";
import { MdShare } from "react-icons/md";

class PopupW extends Component {
  render() {
    const sharelink = this.props.sharelink;
    const title = this.props.title;

    return (
      <Popup
        trigger={
          <button className={this.props.className}>
            <MdShare />
          </button>
        }
        onOpen={(e) => e.stopPropagation()}
        className="sharepopup"
        modal
      >
        {(close) => (
          <div className="mm">
            <a className="close" onClick={close}>
              &times;
            </a>
            <div className="header">{title}</div>
            <div className="content">
              <h5>Share via</h5>
              <ShareButton size="55" sharelink={sharelink} tooltipOff={true} />
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

export default PopupW;
