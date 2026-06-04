import React from "react";
import ReactDOM from "react-dom/client";
import GsapAnimations from "./GsapAnimations";
import Home from "./pages/Home";
import CorpadPage from "./pages/CorpadDigital";
import CorpadConsultoria from "./pages/CorpadConsultoria";
import "./globals.css";

function App() {
  const pathname = window.location.pathname;

  if (pathname === "/corpad-digital") {
    return <CorpadPage />;
  }

  if (pathname === "/corpad-consultoria") {
    return <CorpadConsultoria />;
  }

  return <Home />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GsapAnimations />
    <App />
  </React.StrictMode>,
);
