import { useEffect } from "react";

export const SITE_URL = "https://corpad.com.br";
export const SITE_NAME = "CORPAD";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: JsonLd;
  noindex?: boolean;
};

function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
}

function upsertJsonLd(id: string, data: JsonLd) {
  let element = document.getElementById(id) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CORPAD",
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    foundingDate: "1996",
    email: "contato@corpad.com.br",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-16-99609-4649",
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
  };
}

export function faqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function usePageSeo({
  title,
  description,
  path = window.location.pathname,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  jsonLd,
  noindex,
}: SeoOptions) {
  useEffect(() => {
    const url = absoluteUrl(path);
    const imageUrl = absoluteUrl(image);

    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl });
    upsertLink("canonical", url);
    upsertJsonLd("corpad-organization-jsonld", organizationJsonLd());

    if (jsonLd) {
      upsertJsonLd("corpad-page-jsonld", jsonLd);
    }

    const existingPageJsonLd = document.getElementById("corpad-page-jsonld");
    if (!jsonLd && existingPageJsonLd) {
      existingPageJsonLd.remove();
    }

    if (noindex) {
      upsertMeta('meta[name="robots"]', { name: "robots", content: "noindex, nofollow" });
    } else {
      const robots = document.head.querySelector('meta[name="robots"]');
      robots?.remove();
    }
  }, [description, image, jsonLd, noindex, path, title, type]);
}
