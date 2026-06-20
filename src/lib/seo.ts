import { useEffect } from "react";

export const SITE_URL = "https://corpad.com.br";
export const SITE_NAME = "CORPAD";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png?v=20260618`;

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  article?: {
    author?: string;
    section?: string;
    publishedTime?: string | null;
    modifiedTime?: string | null;
    tags?: string[];
  };
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

function removeMeta(selector: string) {
  document.head.querySelectorAll(selector).forEach((element) => element.remove());
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: "CORPAD",
    legalName: "CORPAD Soluções Digitais e Consultoria Empresarial",
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    image: DEFAULT_OG_IMAGE,
    foundingDate: "1996",
    email: "contato@corpad.com.br",
    telephone: "+55-16-99609-4649",
    priceRange: "$$",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-16-99609-4649",
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Atendimento digital e consultivo para empresas",
      addressLocality: "Monte Alto",
      addressRegion: "SP",
      postalCode: "15910-000",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -21.2616,
      longitude: -48.4969,
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Brasil",
      },
      {
        "@type": "AdministrativeArea",
        name: "Sao Paulo",
      },
      {
        "@type": "City",
        name: "Monte Alto",
      },
      {
        "@type": "City",
        name: "Ribeirao Preto",
      },
    ],
    knowsAbout: [
      "criacao de sites",
      "marketing digital",
      "trafego pago",
      "automacao de processos",
      "consultoria empresarial",
      "infraestrutura em nuvem",
      "e-mail profissional",
      "SEO",
      "GEO",
      "AEO",
      "otimizacao para mecanismos de resposta",
      "otimizacao para mecanismos generativos",
      "sites para empresas locais",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Criação de sites profissionais",
          areaServed: "Brasil",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Consultoria empresarial e tecnologia",
          areaServed: "Brasil",
        },
      },
    ],
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
  keywords = [],
  article,
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
    upsertMeta('meta[name="geo.region"]', { name: "geo.region", content: "BR-SP" });
    upsertMeta('meta[name="geo.placename"]', { name: "geo.placename", content: "Monte Alto, Sao Paulo, Brasil" });
    upsertMeta('meta[name="geo.position"]', { name: "geo.position", content: "-21.2616;-48.4969" });
    upsertMeta('meta[name="ICBM"]', { name: "ICBM", content: "-21.2616, -48.4969" });
    upsertLink("canonical", url);
    upsertJsonLd("corpad-organization-jsonld", organizationJsonLd());

    if (keywords.length > 0) {
      upsertMeta('meta[name="keywords"]', { name: "keywords", content: keywords.join(", ") });
    } else {
      removeMeta('meta[name="keywords"]');
    }

    removeMeta('meta[property^="article:"]');

    if (type === "article" && article) {
      if (article.publishedTime) {
        upsertMeta('meta[property="article:published_time"]', {
          property: "article:published_time",
          content: article.publishedTime,
        });
      }

      if (article.modifiedTime) {
        upsertMeta('meta[property="article:modified_time"]', {
          property: "article:modified_time",
          content: article.modifiedTime,
        });
      }

      if (article.author) {
        upsertMeta('meta[property="article:author"]', { property: "article:author", content: article.author });
      }

      if (article.section) {
        upsertMeta('meta[property="article:section"]', { property: "article:section", content: article.section });
      }

      (article.tags ?? []).forEach((tag) => {
        const element = document.createElement("meta");
        element.setAttribute("property", "article:tag");
        element.setAttribute("content", tag);
        document.head.appendChild(element);
      });
    }

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
  }, [article, description, image, jsonLd, keywords, noindex, path, title, type]);
}
