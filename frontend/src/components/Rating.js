import React from "react";
import { UilStar } from "@iconscout/react-unicons";
import {
  UisStar,
  UisStarHalfAlt,
  UisAngleRightB,
  UisAngleLeft,
  UisCheckCircle,
} from "@iconscout/react-unicons-solid";
import PropTypes from "prop-types";

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span style={{ color }}>
        {value >= 1 ? (
          <UisStar />
        ) : value <= 0.5 ? (
          <UisStarHalfAlt />
        ) : (
          <UilStar />
        )}
      </span>
      <span style={{ color }}>
        {value >= 2 ? (
          <UisStar />
        ) : value <= 1.5 ? (
          <UisStarHalfAlt />
        ) : (
          <UilStar />
        )}
      </span>
      <span style={{ color }}>
        {value >= 3 ? (
          <UisStar />
        ) : value <= 2.5 ? (
          <UisStarHalfAlt />
        ) : (
          <UilStar />
        )}
      </span>
      <span style={{ color }}>
        {value >= 4 ? (
          <UisStar />
        ) : value <= 3.5 ? (
          <UisStarHalfAlt />
        ) : (
          <UilStar />
        )}
      </span>
      <span style={{ color }}>
        {value >= 5 ? (
          <UisStar />
        ) : value <= 4.5 ? (
          <UisStarHalfAlt />
        ) : (
          <UilStar />
        )}
      </span>
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#ffc000",
};

Rating.protoType = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
