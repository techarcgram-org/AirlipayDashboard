import React from "react";

const Sidebar = React.forwardRef((props, ref) => {
  // Use the ref in the root element of the Sidebar component
  return <div ref={ref}>Sidebar</div>;
});

export default Sidebar