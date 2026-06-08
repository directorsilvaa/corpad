import Home from "./Home";
import ConsultingServicePage from "./ConsultingServicePage";
import { getConsultingServicePageBySlug } from "../data/consultingServicePages";

export default function ConsultingServiceRoute() {
  const service = getConsultingServicePageBySlug(
    window.location.pathname.replace("/corpad-consultoria/servicos/", ""),
  );

  return service ? <ConsultingServicePage service={service} /> : <Home />;
}
