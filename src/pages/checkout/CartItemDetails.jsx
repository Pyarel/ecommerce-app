import { useState } from "react";
import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import { DeliveryOptions } from "./DeliveryOptions";
import axios from "axios";
export function CartItemDetails({
  cartItem,
  loadCart,
  deliveryOptions,
  selectedDeliveryOption,
  deleteCartItem,
}) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isModify, setIsModify] = useState(false);
  const updateCartItem = async () => {
    setIsUpdate(true);
    isModify &&
      (await axios.put(`/api/cart-items/${cartItem.product.id}`, {
        quantity: quantity,
      }));
    setIsModify(false);
    await loadCart();
  };
  const updateQuantity = (event) => {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity);
    console.log(newQuantity);
    setIsModify(true);
  };
  const updateItemQuantity = (event) => {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity);
    console.log(newQuantity);
    setIsModify(true);
    if (event.key === "Enter") {
      updateCartItem();
    }
    if (event.key === "Escape") {
      setIsUpdate(false);
      setIsModify(false);
    }
  };
  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date:{" "}
        {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
          "dddd, MMMM D"
        )}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image" src={cartItem.product.image} />

        <div className="cart-item-details">
          <div className="product-name">{cartItem.product.name}</div>
          <div className="product-price">
            ${formatMoney(cartItem.product.priceCents)}
          </div>
          <div className="product-quantity">
            <span>
              Quantity:{" "}
              <input
                type="text"
                className="quantity-input"
                value={quantity}
                onChange={updateQuantity}
                onKeyDown={updateItemQuantity}
                style={{
                  visibility: isUpdate ? "visible" : "hidden",
                }}
              />
              <span className="quantity-label">{cartItem.quantity}</span>
            </span>
            <span
              className="update-quantity-link link-primary"
              onClick={updateCartItem}
            >
              Update
            </span>
            <span
              className="delete-quantity-link link-primary"
              onClick={deleteCartItem}
            >
              Delete
            </span>
          </div>
        </div>

        <DeliveryOptions
          deliveryOptions={deliveryOptions}
          cartItem={cartItem}
          loadCart={loadCart}
        />
      </div>
    </div>
  );
}
