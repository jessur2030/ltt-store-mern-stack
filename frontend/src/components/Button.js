import PropTypes from "prop-types";

const Button = ({ color, text, onClick }) => {
  //   const onClick = (e) => {
  //     console.log(e);
  //   };
  return (
    <button
      onClick={onClick}
      //  style={{ color: color }}

      className="nav-btn"
    >
      {text}
    </button>
  );
};

// Button.defaultProps = {
//   color: "#000",
// };

//PropTypes
Button.propTypes = {
  //   text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
