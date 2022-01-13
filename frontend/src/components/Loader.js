import React from "react";
import { UilSpinner } from "@iconscout/react-unicons";
import "./Loader.css";

const Loader = () => {
  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <UilSpinner
          className="spinner"
          style={{ height: "60px", width: "60px" }}
        />
      </div>
      {/* <svg class="spinner" viewBox="0 0 50 50">
        <circle
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="2"
        ></circle>
      </svg> */}
    </>
  );
};

export default Loader;
