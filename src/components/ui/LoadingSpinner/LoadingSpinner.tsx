import { FC } from "react";
import "./LoadingSpinner.css";

const LoadingSpinner: FC = () => {
  return (
    <div className={`loading-spinner-wrapper `}>
      <div className="loading-spinner"></div>
    </div>
  );
};
export default LoadingSpinner;
