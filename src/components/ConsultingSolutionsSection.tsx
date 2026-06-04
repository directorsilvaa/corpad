"use client";

import {
  BarChart3,
  BriefcaseBusiness,
  DatabaseZap,
  Server,
  Settings2,
  Phone,
} from "lucide-react";
import ConsultingSolutionCard from "./ConsultingSolutionCard";

const solutions = [
  {
    title: "Consultoria Empresarial",
    icon: BriefcaseBusiness,
    description:
      "Estruturamos processos, desenvolvemos estratégias e identificamos oportunidades para aumentar a eficiência e a rentabilidade da sua empresa.",
  },
  {
    title: "Consultoria em Tecnologia da Informação",
    icon: Settings2,
    description:
      "Avaliamos, planejamos e implementamos soluções tecnológicas capazes de aumentar a segurança, produtividade e estabilidade operacional.",
  },
  {
    title: "Inteligência de Dados",
    icon: DatabaseZap,
    description:
      "Transforme informações em decisões estratégicas através de dashboards, indicadores e relatórios inteligentes.",
  },
  {
    title: "Servidores em Nuvem",
    icon: Server,
    description:
      "Infraestrutura segura, escalável e preparada para suportar o crescimento da sua operação.",
  },
  {
    title: "Telefonia em Nuvem",
    icon: Phone,
    description:
      "Comunicação corporativa moderna, eficiente e acessível de qualquer lugar.",
  },
  {
    title: "BPO Financeiro",
    icon: BarChart3,
    description:
      "Mais organização financeira, previsibilidade e controle para sua empresa crescer com segurança.",
  },
];

export default function ConsultingSolutionsSection() {
  return (
    <section className="consulting-section consulting-solutions-section" id="solucoes">
      <div className="consulting-section-heading consulting-ui-heading">
        <span className="consulting-kicker">Nossas soluções</span>
        <h2>Soluções completas para impulsionar seu negócio</h2>
        <p>
          Consultoria, tecnologia e dados organizados em uma esteira clara para
          sua empresa ganhar velocidade sem perder controle.
        </p>
      </div>
      <div className="consulting-card-grid">
        {solutions.map((solution) => (
          <ConsultingSolutionCard
            key={solution.title}
            title={solution.title}
            description={solution.description}
            icon={solution.icon}
          />
        ))}
      </div>
    </section>
  );
}
