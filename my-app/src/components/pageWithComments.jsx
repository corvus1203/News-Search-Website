import React from "react";
import commentBox from "commentbox.io";

class PageWithComments extends React.Component {
  componentDidMount() {
    this.removeCommentBox = commentBox("");
  }

  componentWillUnmount() {
    this.removeCommentBox();
  }

  render() {
    return <div className="commentbox" id={this.props.boxid} />;
  }
}
export default PageWithComments;
