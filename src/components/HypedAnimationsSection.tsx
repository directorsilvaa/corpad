import {
  BadgeCheck,
  FileCode2,
  Github,
  Puzzle,
  Sparkles,
  Zap,
} from "lucide-react";
import type { CSSProperties } from "react";

export const featureAnimations = [
  {
    title: "Personalizável",
    description:
      "Ajuste cada sistema conforme sua necessidade, com fluxos, regras e interfaces sob medida para o seu negócio.",
    illustration: <PuzzleIllustration />,
    span: "",
  },
  {
    title: "Plug & Play",
    description:
      "Nada de complicação. Implementamos soluções prontas para uso, com integração rápida ao seu processo atual.",
    illustration: <PlugPlayIllustration />,
    span: "wide",
  },
  {
    title: "Pronto para Produção",
    description:
      "Sistemas estáveis, testados e preparados para uso real, com segurança, performance e confiabilidade.",
    illustration: <ReadyIllustration />,
    span: "",
  },
  {
    title: "Preparado para Evolução",
    description:
      "Arquitetura moderna e flexível, preparada para evolução contínua, integrações e crescimento sem retrabalho.",
    illustration: <OpenSourceIllustration />,
    span: "",
  },
  {
    title: "Desenvolvimento Rápido",
    description:
      "Reduza semanas de trabalho com soluções já estruturadas e foque no que realmente gera valor.",
    illustration: <SpeedIllustration />,
    span: "",
  },
  {
    title: "Acessível e Intuitivo",
    description:
      "Interfaces simples, responsivas e fáceis de usar, garantindo uma ótima experiência para qualquer usuário.",
    illustration: <AccessibilityIllustration />,
    span: "wide warm",
  },
];

type FeatureAnimationCardProps = {
  item: (typeof featureAnimations)[number];
  className?: string;
};

export function FeatureAnimationCard({
  item,
  className = "",
}: FeatureAnimationCardProps) {
  return (
    <article
      className={[
        "hyped-card",
        className,
        ...item.span
          .split(" ")
          .filter(Boolean)
          .map((variant) => `hyped-card-${variant}`),
      ].join(" ")}
    >
      <div className="hyped-visual">{item.illustration}</div>
      <div className="hyped-card-copy">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </article>
  );
}

export default function HypedAnimationsSection() {
  return (
    <section className="hyped-section" aria-labelledby="hyped-section-title">
      <div className="hyped-section-heading">
        <span className="section-kicker">Recursos da solução</span>
        <h2 id="hyped-section-title">
          Tudo que sua estrutura digital precisa para evoluir
        </h2>
        <p>
          Recursos visuais, técnicos e operacionais pensados para acelerar a
          implementação, reduzir retrabalho e entregar uma experiência mais
          simples para sua equipe e seus clientes.
        </p>
      </div>

      <div className="hyped-grid">
        {featureAnimations.map((feature) => (
          <FeatureAnimationCard item={feature} key={feature.title} />
        ))}
      </div>
    </section>
  );
}

function PuzzleIllustration() {
  return (
    <div className="hyped-puzzle" aria-hidden="true">
      <Puzzle className="hyped-puzzle-piece hyped-puzzle-piece-a" />
      <Puzzle className="hyped-puzzle-piece hyped-puzzle-piece-b" />
      <Puzzle className="hyped-puzzle-piece hyped-puzzle-piece-c" />
    </div>
  );
}

function PlugPlayIllustration() {
  return (
    <div className="hyped-plug" aria-hidden="true">
      <div className="hyped-cube hyped-cube-left">
        <span>c</span>
      </div>
      <div className="hyped-code-target">
        <FileCode2 size={28} />
      </div>
      <div className="hyped-cube hyped-cube-right">
        <Zap size={42} />
      </div>
    </div>
  );
}

function ReadyIllustration() {
  const items = [
    "Configurações do Sistema",
    "Planos e Tabelas",
    "Cadastro de Planos",
    "Precificação",
    "Portal do Cliente",
  ];

  return (
    <div className="hyped-ready" aria-hidden="true">
      {items.map((item, index) => (
        <span className="hyped-pill" style={{ "--pill-index": index } as CSSProperties} key={item}>
          <BadgeCheck size={12} />
          {item}
        </span>
      ))}
    </div>
  );
}

function OpenSourceIllustration() {
  return (
    <div className="hyped-open-source" aria-hidden="true">
      <div className="hyped-waves">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="hyped-github">
        <Github size={68} fill="currentColor" />
      </div>
    </div>
  );
}

function SpeedIllustration() {
  return (
    <div className="hyped-speed" aria-hidden="true">
      <span className="hyped-speed-badge">10x Faster</span>
      <svg viewBox="0 0 260 150" className="hyped-speedometer">
        <path className="hyped-speed-track" d="M38 126a92 92 0 0 1 184 0" />
        <path className="hyped-speed-fill" d="M38 126a92 92 0 0 1 184 0" />
        <line className="hyped-speed-needle" x1="130" y1="126" x2="80" y2="82" />
        <circle cx="130" cy="126" r="5" />
      </svg>
    </div>
  );
}

function AccessibilityIllustration() {
  return (
    <div className="hyped-accessibility" aria-hidden="true">
      <button type="button">SHIFT</button>
      <button type="button">TAB</button>
      <button type="button">SPACE</button>
      <Sparkles className="hyped-cursor" size={44} />
    </div>
  );
}
