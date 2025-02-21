import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <ThemeProvider>
  <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </PersistGate>
  </Provider>

  // </ThemeProvider>
);
