"use client";
import { store } from "@/redux/store/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";

const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ToastContainer position="bottom-right" />
        {children}
      </Provider>
    </SessionProvider>
  );
};

export default Providers;
