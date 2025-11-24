import axios from "axios";
import "./HomePage.css";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import { useEffect, useState } from "react";

export function HomePage({ cart }) {
  //   fetch("http://localhost:3000/api/products")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };
    getHomeData();
  }, []);

  return (
    <>
      <Header cart={cart} />
      <title>E-commerce Project</title>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
