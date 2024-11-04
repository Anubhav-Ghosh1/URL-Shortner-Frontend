import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster position="bottom-center" reverseOrder={false} />
      </Provider>
    </BrowserRouter>
);