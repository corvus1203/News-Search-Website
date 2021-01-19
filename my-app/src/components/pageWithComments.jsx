import React from "react";
import commentBox from "commentbox.io";

class PageWithComments extends React.Component {
  componentDidMount() {
    this.removeCommentBox = commentBox("5672061863198720-proj");
  }

  componentWillUnmount() {
    this.removeCommentBox();
  }

  render() {
    return <div className="commentbox" id={this.props.boxid} />;
  }
}
export default PageWithComments;
