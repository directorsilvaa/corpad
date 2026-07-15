const whatsappHosts = new Set(["wa.me", "api.whatsapp.com", "web.whatsapp.com"]);

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

function isWhatsappUrl(url: URL) {
  return whatsappHosts.has(url.hostname.replace(/^www\./, ""));
}

export function registerGoogleAdsWhatsappConversions() {
  const handleClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const link = (event.target as Element | null)?.closest("a");

    if (!link) {
      return;
    }

    const href = link.getAttribute("href");

    if (!href) {
      return;
    }

    const url = new URL(link.href, window.location.href);

    if (!isWhatsappUrl(url) || typeof window.gtag_report_conversion !== "function") {
      return;
    }

    event.preventDefault();
    window.gtag_report_conversion(url.href);
  };

  document.addEventListener("click", handleClick, true);

  return () => {
    document.removeEventListener("click", handleClick, true);
  };
}
