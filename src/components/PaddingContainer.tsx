import { ReactNode } from "react";

const PaddingContainer = ({ children }: { children: ReactNode }) => {
  return <div className="w-full max-w-6xl px-8 mx-auto">{children}</div>;
};

export default PaddingContainer;
