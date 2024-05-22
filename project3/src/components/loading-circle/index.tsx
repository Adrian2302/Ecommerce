import "./styles.scss";
import React from "react";
import { Spinner } from "@nextui-org/react";

const LoadingCircle: React.FC = () => {
  return (
    <div className="loading-container">
      <Spinner color="default" size="lg" />
    </div>
  );
};

export default LoadingCircle;
