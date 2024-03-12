"use client";

import RingLoader from "react-spinners/RingLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#1C3B87",
};

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      {/* <Spinner size={50} loading={true} /> */}
      <RingLoader
        color={"#1C3B87"}
        // color={"#36d7b7"}
        loading={true}
        size={50}
        speedMultiplier={1}
        aria-label="Loading Spinner"
        data-tesid="loader"
      />
    </div>
  );
}
