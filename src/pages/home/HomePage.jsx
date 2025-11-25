import axios from "axios";
import "./HomePage.css";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export function HomePage({ cart, loadCart }) {
  //   fetch("http://localhost:3000/api/products")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  useEffect(() => {
    const getHomeData = async () => {
      let response;
      if (search) {
        response = await axios.get(`/api/products?search=${search}`);
      } else {
        response = await axios.get("/api/products");
      }
      setProducts(response.data);
    };
    getHomeData();
  }, [search]);

  return (
    <>
      <Header cart={cart} />
      <title>E-commerce Project</title>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
