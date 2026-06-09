import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import "./globals.css";

if (window.location.hostname === "www.corpad.com.br") {
  window.location.replace(
    `https://corpad.com.br${window.location.pathname}${window.location.search}${window.location.hash}`,
  );
}

const GsapAnimations = React.lazy(() => import("./GsapAnimations"));
const CorpadPage = React.lazy(() => import("./pages/CorpadDigital"));
const CorpadConsultoria = React.lazy(() => import("./pages/CorpadConsultoria"));
const ConsultingServiceRoute = React.lazy(() => import("./pages/ConsultingServiceRoute"));
const ClientesPage = React.lazy(() => import("./pages/Clientes"));
const PortfolioPage = React.lazy(() => import("./pages/Portfolio"));
const ServiceRoute = React.lazy(() => import("./pages/ServiceRoute"));
const BlogPage = React.lazy(() => import("./pages/Blog"));
const AdminPage = React.lazy(() => import("./pages/Admin"));

function useClientRoute() {
  const [pathname, setPathname] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const updatePathname = () => setPathname(window.location.pathname);

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const link = (event.target as Element | null)?.closest("a");
      if (!link) {
        return;
      }

      const target = link.getAttribute("target");
      const href = link.getAttribute("href");
      const download = link.hasAttribute("download");

      if (!href || download || (target && target !== "_self") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      const url = new URL(link.href, window.location.href);
      const samePageHash = url.pathname === window.location.pathname && url.search === window.location.search && url.hash;

      if (url.origin !== window.location.origin || samePageHash) {
        return;
      }

      event.preventDefault();
      window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
      updatePathname();

      if (url.hash) {
        document.querySelector(url.hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };

    window.addEventListener("popstate", updatePathname);
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("popstate", updatePathname);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return pathname;
}

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

function App({ pathname }: { pathname: string }) {
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

function Root() {
  const pathname = useClientRoute();

  return (
    <>
      <DeferredAnimations />
      <React.Suspense fallback={null}>
        <App pathname={pathname} />
      </React.Suspense>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
