import "./styles.scss";
import { Divider } from "@nextui-org/react";
import Nothing from "../../components/nothing";

const ErrorPage: React.FC = () => {
  return (
    <main className="error-page">
      <h1 className="error-page__title error-page__title--big error-page__title--bold">
        Oops...
      </h1>
      <Divider className="shopping-cart-page__divider" />
      <Nothing />
    </main>
  );
};

export default ErrorPage;
