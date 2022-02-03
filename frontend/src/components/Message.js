import React from "react";

const Message = ({ text }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h2 className="errmsg"> {text}</h2>
    </div>
  );
};

export default Message;
