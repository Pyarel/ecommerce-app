import { Header } from "../components/Header";
import "./NotFoundPage.css";
export function NotFoundPage({ cart }) {
  return (
    <>
      <title>404 Not found</title>
      <Header cart={cart} />
      <div className="container-center">
        The page you are looking for does not exist
      </div>
    </>
  );
}
