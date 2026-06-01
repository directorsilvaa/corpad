import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import LightRays from "./LightRays";

const navItems = [
  { label: "Soluções", href: "#solucoes", active: true },
  { label: "Projetos", href: "#projetos" },
  { label: "Sobre", href: "#sobre" },
];
const supportPhrases = [
  "Mais de 20 anos desenvolvendo soluções digitais para empresas que querem evoluir.",
];
export default function Home() {
  return (
    <main className="verdant-page">
      <Image
        className="background-image"
        src="/blue-ring-background.png?v=20260601-2"
        alt=""
        fill
        priority
        sizes="100vw"
      />
      <div className="background-overlay" aria-hidden="true" />
      <LightRays
        className="hero-light-rays"
        raysOrigin="top-center"
        raysColor="#8df0ff"
        raysSpeed={0.8}
        lightSpread={0.72}
        rayLength={2.2}
        pulsating
        fadeDistance={1.08}
        saturation={1.12}
        mouseInfluence={0.09}
        noiseAmount={0.045}
        distortion={0.075}
      />

      <header className="navbar">
        <a className="brand" href="#" aria-label="Página inicial">
          <Image
            className="brand-logo"
            src="/logo.png"
            alt="Logo"
            width={1500}
            height={390}
            priority
          />
        </a>

        <nav className="nav-links" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a
              className={item.active ? "active" : undefined}
              href={item.href}
              key={item.label}
              aria-current={item.active ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="nav-cta" href="#contato">
            Fale conosco <ArrowRight size={15} />
          </a>
        </div>
      </header>

      <section className="hero-shell">
        <div className="hero-content">
          <h1>
            Transforme sua presença digital
            <br />
            em uma <em>máquina de crescimento</em>
          </h1>

          <p>
            Criamos sites, lojas virtuais, marketing, tráfego pago, hospedagem
            e automações para empresas que querem vender mais e crescer com
            tecnologia.
          </p>

          <div className="hero-actions">
            <a className="primary-cta" href="#contato">
              Falar com um especialista <ArrowRight size={17} />
            </a>
            <a className="secondary-cta" href="#solucoes">
              Conhecer soluções
            </a>
          </div>

          <div className="benefits" aria-label="Frase de apoio">
            {supportPhrases.map((phrase) => (
              <span key={phrase}>
                <i>
                  <Check size={10} strokeWidth={3} />
                </i>
                {phrase}
              </span>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
}
