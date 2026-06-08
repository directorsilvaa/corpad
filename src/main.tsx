import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import "./globals.css";

const GsapAnimations = React.lazy(() => import("./GsapAnimations"));
const CorpadPage = React.lazy(() => import("./pages/CorpadDigital"));
const CorpadConsultoria = React.lazy(() => import("./pages/CorpadConsultoria"));
const ConsultingServiceRoute = React.lazy(() => import("./pages/ConsultingServiceRoute"));
const ClientesPage = React.lazy(() => import("./pages/Clientes"));
const PortfolioPage = React.lazy(() => import("./pages/Portfolio"));
const ServiceRoute = React.lazy(() => import("./pages/ServiceRoute"));
const BlogPage = React.lazy(() => import("./pages/Blog"));
const AdminPage = React.lazy(() => import("./pages/Admin"));

function DeferredAnimations() {
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    if (window.location.pathname === "/") {
      return undefined;
    }

    const loadAnimations = () => setEnabled(true);
    let timeoutId: number | undefined;

    const scheduleAnimations = () => {
      timeoutId = window.setTimeout(loadAnimations, 3600);
    };

    if (document.readyState === "complete") {
      scheduleAnimations();
    } else {
      window.addEventListener("load", scheduleAnimations, { once: true });
    }

    return () => {
      window.removeEventListener("load", scheduleAnimations);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <React.Suspense fallback={null}>
      <GsapAnimations />
    </React.Suspense>
  );
}

function App() {
  const pathname = window.location.pathname;

  if (pathname === "/corpad-digital") {
    return <CorpadPage />;
  }

  if (pathname === "/corpad-consultoria") {
    return <CorpadConsultoria />;
  }

  if (pathname.startsWith("/corpad-consultoria/servicos/")) {
    return <ConsultingServiceRoute />;
  }

  if (pathname === "/portfolio") {
    return <PortfolioPage />;
  }

  if (pathname === "/clientes") {
    return <ClientesPage />;
  }

  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    return <BlogPage />;
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return <AdminPage />;
  }

  if (pathname.startsWith("/servicos/")) {
    return <ServiceRoute />;
  }

  return <Home />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DeferredAnimations />
    <React.Suspense fallback={null}>
      <App />
    </React.Suspense>
  </React.StrictMode>,
);
