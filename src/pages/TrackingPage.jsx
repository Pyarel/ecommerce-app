import "./TrackingPage.css";
import { Header } from "../components/Header";
import { Link } from "react-router";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();

  const [order, setOrder] = useState(null);
  useEffect(() => {
    const getTrackingData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );
      setOrder(response.data);
    };
    getTrackingData();
  }, [orderId]);

  if (!order) {
    return null;
  }
  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });
  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryTime = (timePassedMs / totalDeliveryTimeMs) * 100;
  let isDelivered = false;
  let isShipped = false;
  let isPreparing = false;
  if (deliveryTime >= 100) {
    deliveryTime = 100;
    isDelivered = true;
  } else if (deliveryTime > 33 && deliveryTime < 100) {
    isShipped = true;
  } else {
    isPreparing = true;
  }

  return (
    <>
      <Header cart={cart} />
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div key={orderProduct.productId} className="delivery-date">
            {deliveryTime >= 100 ? `Delivered on ` : `Arriving on `}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}
          </div>

          <div className="product-info">{orderProduct.product.name}</div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${isPreparing && "current-status"}`}
            >
              Preparing
            </div>
            <div className={`progress-label ${isShipped && "current-status"}`}>
              Shipped
            </div>
            <div
              className={`progress-label ${isDelivered && "current-status"}`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryTime}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
