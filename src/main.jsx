import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.jsx";
import { BrowserRouter } from "react-router";
import { ViewProvider } from "./context/View.jsx";
import { UserProvider } from "./context/User.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ViewProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ViewProvider>
  </BrowserRouter>
);
