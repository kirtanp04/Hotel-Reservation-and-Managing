import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { baseUrlName } from "./Constant.ts";
import { ThemeSettingCTXProvider } from "./context/ThemeSettingCTX.tsx";
import "./index.css";
import ThemeProvider from "./theme/index.tsx";
import Toster from "./util/Toster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeSettingCTXProvider>
    <ThemeProvider>
      <BrowserRouter basename={baseUrlName}>
        <App />
        <Toster />
      </BrowserRouter>
    </ThemeProvider>
  </ThemeSettingCTXProvider>
);
