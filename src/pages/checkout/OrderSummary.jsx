import axios from "axios";
import { CartItemDetails } from "./CartItemDetails";
export function OrderSummary({ deliveryOptions, cart, loadCart }) {
  return (
    <>
      <div className="order-summary">
        {deliveryOptions.length > 0 &&
          cart.map((cartItem) => {
            const selectedDeliveryOption = deliveryOptions.find(
              (deliveryOption) => {
                return deliveryOption.id === cartItem.deliveryOptionId;
              }
            );
            const deleteCartItem = async () => {
              await axios.delete(`/api/cart-items/${cartItem.productId}`);
              await loadCart();
            };

            return (
              <CartItemDetails
                key={cartItem.productId}
                deliveryOptions={deliveryOptions}
                loadCart={loadCart}
                cartItem={cartItem}
                deleteCartItem={deleteCartItem}
                selectedDeliveryOption={selectedDeliveryOption}
              />
            );
          })}
      </div>
    </>
  );
}
