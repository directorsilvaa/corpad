import React from "react";
import ReactDOM from "react-dom/client";
import GsapAnimations from "./GsapAnimations";
import Home from "./pages/Home";
import CorpadPage from "./pages/CorpadDigital";
import CorpadConsultoria from "./pages/CorpadConsultoria";
import ConsultingServicePage from "./pages/ConsultingServicePage";
import ClientesPage from "./pages/Clientes";
import PortfolioPage from "./pages/Portfolio";
import ServicePage from "./pages/ServicePage";
import { getConsultingServicePageBySlug } from "./data/consultingServicePages";
import { getServicePageBySlug } from "./data/servicePages";
import "./globals.css";

function App() {
  const pathname = window.location.pathname;

  if (pathname === "/corpad-digital") {
    return <CorpadPage />;
  }

  if (pathname === "/corpad-consultoria") {
    return <CorpadConsultoria />;
  }

  if (pathname.startsWith("/corpad-consultoria/servicos/")) {
    const service = getConsultingServicePageBySlug(
      pathname.replace("/corpad-consultoria/servicos/", "")
    );

    if (service) {
      return <ConsultingServicePage service={service} />;
    }
  }

  if (pathname === "/portfolio") {
    return <PortfolioPage />;
  }

  if (pathname === "/clientes") {
    return <ClientesPage />;
  }

  if (pathname.startsWith("/servicos/")) {
    const service = getServicePageBySlug(pathname.replace("/servicos/", ""));

    if (service) {
      return <ServicePage service={service} />;
    }
  }

  return <Home />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GsapAnimations />
    <App />
  </React.StrictMode>,
);
