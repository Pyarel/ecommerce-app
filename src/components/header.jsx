import { Link, NavLink } from "react-router";
import WhiteLogo from "../assets/logo-white.png";
import "./Header.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router";
export function Header({ cart }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [searchText, setSearchText] = useState(search || "");

  const updateSearchInput = (event) => {
    setSearchText(event.target.value);
  };
  const searchProduct = () => {
    navigate(`/?search=${searchText}`);
  };
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img className="logo" src={WhiteLogo} />
            <img className="mobile-logo" src={WhiteLogo} />
          </Link>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            onChange={updateSearchInput}
            value={searchText}
          />

          <button className="search-button" onClick={searchProduct}>
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link " to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <Link className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  );
}
