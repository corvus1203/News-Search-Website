import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

function Loading() {
  return (
    <div className="sweet-loading">
      <BounceLoader size="30px" color="#385ccd" loading={true} />
      Loading
    </div>
  );
}

export default Loading;
