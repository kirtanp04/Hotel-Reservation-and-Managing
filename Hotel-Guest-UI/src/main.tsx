import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ThemeSettingCTXProvider } from "./context/ThemeSettingCTX.tsx";
import "./index.css";
import ThemeProvider from "./theme/index.tsx";
import Toster from "./util/Toster.tsx";
import { baseUrlName } from "./Constant.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId="831825545652-fo49fofro8bk0e9q9mmue8k7o9v858bn.apps.googleusercontent.com"> */}
    <ThemeSettingCTXProvider>
      <ThemeProvider>
        <BrowserRouter basename={baseUrlName}>
          <App />
          <Toster />
        </BrowserRouter>
      </ThemeProvider>
    </ThemeSettingCTXProvider>
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>
);
