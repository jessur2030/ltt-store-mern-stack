import Rating from "./Rating";
import "./Product.css";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  return (
    <div className="container">
      <div className="card stacked">
        <Link to={`product/${product._id}`}>
          <img src={product.image} className="card__img" />
        </Link>
        <div className="card__content">
          <h2 className="card__title">{product.name}</h2>
          <p className="card__price">${product.price}</p>
          <p className="card__description">Eveniet, necessitatibus id.</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
