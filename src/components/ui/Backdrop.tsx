import React, { ReactNode } from "react";

type BackdropProps = {
  children: ReactNode;
};

const Backdrop: React.FC<BackdropProps> = ({ children }) => {
  return (
    <div className="fixed w-full h-screen top-0 left-0 z-10 bg-th_backdrop">
      {children}
    </div>
  );
};

export default Backdrop;
