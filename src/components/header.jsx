import { Link, NavLink } from "react-router";
import WhiteLogo from "../assets/logo-white.png";
import "./Header.css";
export function Header() {
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
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link " to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <Link className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">3</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  );
}
