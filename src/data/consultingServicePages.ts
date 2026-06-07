export type ConsultingServicePageContent = {
  slug: string;
  navLabel: string;
  heroTitle: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  highlights: string[];
  sections: Array<{
    title: string;
    body: string;
  }>;
  process: string[];
};

export const consultingServicePages: ConsultingServicePageContent[] = [
  {
    slug: "servidores-em-nuvem",
    navLabel: "Servidores em nuvem",
    heroTitle: "Infraestrutura em nuvem pronta para sustentar o crescimento da sua empresa",
    metaTitle: "Servidores em Nuvem | CORPAD Consultoria",
    metaDescription:
      "Servidores VPS, dedicados e infraestrutura em nuvem com alta performance, baixa latencia, seguranca e presenca no Brasil, America do Norte e Europa.",
    intro:
      "A CORPAD estrutura ambientes VPS, servidores dedicados e solucoes em nuvem para empresas que precisam de desempenho, disponibilidade e simplicidade para operar sem travar o crescimento.",
    highlights: [
      "Ativacao rapida para tirar projetos do papel",
      "SSD, NVMe e hardware de alta performance",
      "Data centers no Brasil, America do Norte e Europa",
      "Anti-DDoS e conectividade de alta velocidade",
    ],
    sections: [
      {
        title: "Performance sem excesso de complexidade",
        body:
          "A infraestrutura e planejada para entregar velocidade, estabilidade e custo adequado ao momento da empresa, seja para sistemas internos, sites, aplicativos ou operacoes mais exigentes.",
      },
      {
        title: "Baixa latencia para operar melhor",
        body:
          "Com servidores em Sao Paulo e presenca internacional, sua empresa ganha uma base mais proxima dos usuarios e preparada para estrategias locais ou globais.",
      },
      {
        title: "Seguranca para servicos criticos",
        body:
          "Recursos como protecao Anti-DDoS, ambientes robustos e conectividade redundante ajudam a manter seus servicos disponiveis com mais confianca.",
      },
    ],
    process: [
      "Entendimento da aplicacao e demanda atual",
      "Escolha entre VPS, dedicado ou ambiente sob medida",
      "Configuracao da infraestrutura e seguranca",
      "Publicacao, testes e acompanhamento inicial",
      "Evolucao conforme o crescimento da operacao",
    ],
  },
  {
    slug: "assessoria-empresarial",
    navLabel: "Assessoria empresarial",
    heroTitle: "Assessoria empresarial para organizar a gestao e melhorar resultados",
    metaTitle: "Assessoria Empresarial | CORPAD Consultoria",
    metaDescription:
      "Assessoria empresarial para organizar processos, apoiar decisoes e melhorar a performance da empresa.",
    intro:
      "A assessoria empresarial da CORPAD ajuda sua empresa a transformar desafios de gestao em prioridades claras, processos mais organizados e decisoes mais bem sustentadas.",
    highlights: [
      "Diagnostico dos principais gargalos da operacao",
      "Planejamento orientado por prioridades reais",
      "Apoio na tomada de decisao e execucao",
      "Melhoria continua dos processos de gestao",
    ],
    sections: [
      {
        title: "Gestao com clareza",
        body:
          "Empresas crescem melhor quando sabem onde estao os gargalos, quais indicadores acompanhar e quais decisoes precisam ser priorizadas.",
      },
      {
        title: "Processos mais organizados",
        body:
          "Apoiamos a estruturacao de rotinas, responsabilidades e fluxos para reduzir retrabalho, melhorar comunicacao interna e aumentar previsibilidade.",
      },
      {
        title: "Acompanhamento consultivo",
        body:
          "A assessoria aproxima estrategia e execucao para que o planejamento nao fique apenas no papel.",
      },
    ],
    process: [
      "Levantamento do momento atual da empresa",
      "Identificacao de problemas e oportunidades",
      "Definicao de prioridades e plano de acao",
      "Apoio na implementacao das melhorias",
      "Monitoramento de resultados e ajustes",
    ],
  },
  {
    slug: "assessoria-em-ti",
    navLabel: "Assessoria em T.I.",
    heroTitle: "Assessoria em T.I. para uma operacao mais segura e eficiente",
    metaTitle: "Assessoria em T.I. | CORPAD Consultoria",
    metaDescription:
      "Assessoria em tecnologia da informacao para empresas que precisam de seguranca, produtividade e estabilidade operacional.",
    intro:
      "A CORPAD avalia a estrutura de tecnologia da empresa e orienta melhorias para aumentar seguranca, produtividade, organizacao e confiabilidade dos recursos de T.I.",
    highlights: [
      "Diagnostico da estrutura tecnologica",
      "Melhorias em seguranca, acessos e operacao",
      "Apoio na escolha de ferramentas e fornecedores",
      "Tecnologia alinhada aos objetivos da empresa",
    ],
    sections: [
      {
        title: "T.I. como apoio ao negocio",
        body:
          "Tecnologia precisa facilitar a rotina da equipe, proteger informacoes e sustentar o crescimento da operacao.",
      },
      {
        title: "Mais seguranca e padronizacao",
        body:
          "Avaliamos acessos, ferramentas, rotinas e riscos para propor uma estrutura mais organizada e confiavel.",
      },
      {
        title: "Decisoes tecnicas mais seguras",
        body:
          "A assessoria ajuda a empresa a investir melhor em tecnologia, evitando escolhas desconectadas da necessidade real.",
      },
    ],
    process: [
      "Analise do ambiente de T.I.",
      "Mapeamento de riscos e gargalos",
      "Recomendacao de melhorias e prioridades",
      "Apoio na implementacao das solucoes",
      "Acompanhamento tecnico consultivo",
    ],
  },
  {
    slug: "inteligencia-de-dados",
    navLabel: "Inteligência de dados",
    heroTitle: "Inteligencia de dados para decisoes mais claras",
    metaTitle: "Inteligencia de Dados | CORPAD Consultoria",
    metaDescription:
      "Inteligencia de dados, dashboards e indicadores para apoiar decisoes empresariais com mais clareza.",
    intro:
      "Transformamos informacoes dispersas em indicadores, dashboards e leituras gerenciais para que sua empresa acompanhe desempenho e tome decisoes com mais seguranca.",
    highlights: [
      "Organizacao de indicadores essenciais",
      "Dashboards para acompanhamento da gestao",
      "Relatorios claros para decisao",
      "Dados conectados aos objetivos da empresa",
    ],
    sections: [
      {
        title: "Dados que ajudam a decidir",
        body:
          "Ter dados nao basta. E preciso organizar, interpretar e transformar informacao em visao pratica para a gestao.",
      },
      {
        title: "Indicadores relevantes",
        body:
          "Definimos metricas que realmente importam para operacao, financeiro, vendas e produtividade, evitando excesso de informacao sem uso.",
      },
      {
        title: "Acompanhamento continuo",
        body:
          "Dashboards e relatorios ajudam a identificar tendencias, problemas e oportunidades antes que eles virem urgencia.",
      },
    ],
    process: [
      "Mapeamento das fontes de informacao",
      "Definicao dos indicadores prioritarios",
      "Organizacao e tratamento dos dados",
      "Criacao de dashboards e relatorios",
      "Leitura gerencial e melhoria continua",
    ],
  },
  {
    slug: "telefonia-em-nuvem",
    navLabel: "Telefonia em nuvem",
    heroTitle: "Telefonia em nuvem para atendimento mais moderno",
    metaTitle: "Telefonia em Nuvem | CORPAD Consultoria",
    metaDescription:
      "Telefonia em nuvem para empresas que precisam melhorar atendimento, mobilidade e controle das comunicacoes.",
    intro:
      "A telefonia em nuvem moderniza a comunicacao corporativa, melhora o atendimento e permite mais controle sobre chamadas, ramais e rotinas comerciais.",
    highlights: [
      "Atendimento acessivel de qualquer lugar",
      "Mais controle sobre chamadas e ramais",
      "Estrutura flexivel para equipes comerciais",
      "Comunicacao corporativa mais profissional",
    ],
    sections: [
      {
        title: "Comunicacao sem depender do escritorio",
        body:
          "Equipes podem atender com mais mobilidade, mantendo padrao profissional e controle mesmo em rotinas hibridas ou externas.",
      },
      {
        title: "Controle e organizacao",
        body:
          "A telefonia em nuvem facilita distribuicao de ramais, acompanhamento de chamadas e ajustes conforme a necessidade da empresa.",
      },
      {
        title: "Mais eficiencia no atendimento",
        body:
          "Uma estrutura moderna reduz perdas de contato e ajuda o cliente a chegar mais rapidamente ao setor correto.",
      },
    ],
    process: [
      "Diagnostico da estrutura de atendimento",
      "Definicao de ramais, fluxos e necessidades",
      "Configuracao da telefonia em nuvem",
      "Testes de chamadas e orientacao da equipe",
      "Acompanhamento para ajustes operacionais",
    ],
  },
  {
    slug: "bpo-financeiro",
    navLabel: "BPO financeiro",
    heroTitle: "BPO financeiro para mais controle e previsibilidade",
    metaTitle: "BPO Financeiro | CORPAD Consultoria",
    metaDescription:
      "BPO financeiro para organizar rotinas financeiras, melhorar previsibilidade e apoiar a gestao da empresa.",
    intro:
      "O BPO financeiro da CORPAD apoia a organizacao das rotinas financeiras para que sua empresa tenha mais controle, previsibilidade e tempo para focar no crescimento.",
    highlights: [
      "Organizacao de contas a pagar e receber",
      "Mais previsibilidade de fluxo de caixa",
      "Rotinas financeiras padronizadas",
      "Informacoes melhores para decisao",
    ],
    sections: [
      {
        title: "Financeiro organizado",
        body:
          "Rotinas financeiras bem estruturadas reduzem atrasos, improvisos e falta de visibilidade sobre a saude da empresa.",
      },
      {
        title: "Previsibilidade para gerir melhor",
        body:
          "Com dados financeiros mais claros, a empresa consegue planejar pagamentos, recebimentos, investimentos e crescimento com mais seguranca.",
      },
      {
        title: "Mais tempo para o negocio",
        body:
          "Ao terceirizar rotinas financeiras operacionais, a gestao ganha tempo e informacao para focar em decisoes estrategicas.",
      },
    ],
    process: [
      "Diagnostico das rotinas financeiras",
      "Organizacao de entradas, saidas e responsabilidades",
      "Padronizacao de processos financeiros",
      "Acompanhamento de contas e fluxo de caixa",
      "Relatorios para controle e decisao",
    ],
  },
];

export const getConsultingServicePageBySlug = (slug: string) =>
  consultingServicePages.find((service) => service.slug === slug);
