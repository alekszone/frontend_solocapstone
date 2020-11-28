import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => (
  <ContentLoader
    speed={3}
    width={800}
    height={660}
    viewBox="0 0 450 250"
    backgroundColor="rgb(238, 238, 238)"
    foregroundColor="blue"
    {...props}
  >
    <rect x="0" y="90" rx="0" ry="0" width="140" height="25" />

    <rect x="160" y="90" rx="0" ry="0" width="140" height="25" />

    <rect x="320" y="90" rx="0" ry="0" width="140" height="25" />
  </ContentLoader>
);

export default Loader;
