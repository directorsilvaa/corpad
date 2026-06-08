import Home from "./Home";
import ServicePage from "./ServicePage";
import { getServicePageBySlug } from "../data/servicePages";

export default function ServiceRoute() {
  const service = getServicePageBySlug(
    window.location.pathname.replace("/servicos/", ""),
  );

  return service ? <ServicePage service={service} /> : <Home />;
}
