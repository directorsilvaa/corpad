export type PortfolioProject = {
  client: string;
  service: string;
  image: string;
  challenge: string;
  solution: string;
  result: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    client: "JS Grupo",
    service: "Site institucional",
    image: "/projetos/6.png",
    challenge:
      "O grupo precisava de uma presença digital organizada para apresentar sua estrutura e áreas de atuação.",
    solution:
      "Criamos uma experiência institucional com navegação clara, comunicação objetiva e foco em credibilidade.",
    result:
      "Um site mais profissional para apoiar relacionamento, apresentação comercial e descoberta da marca.",
  },
  {
    client: "Instituto Mont Care",
    service: "Site para saúde",
    image: "/projetos/5.png",
    challenge:
      "A instituição precisava apresentar serviços, especialidades e informações de atendimento com mais clareza.",
    solution:
      "Desenvolvemos uma estrutura visual acolhedora, direta e preparada para orientar o visitante.",
    result:
      "Uma presença digital mais confiável para pacientes, familiares e parceiros.",
  },
  {
    client: "JS Trader",
    service: "Site corporativo",
    image: "/projetos/7.png",
    challenge:
      "A empresa precisava comunicar sua atuação em importação, exportação e conexão comercial internacional.",
    solution:
      "Criamos uma interface objetiva, com hierarquia forte, seções institucionais e apresentação clara dos serviços.",
    result:
      "Um canal digital preparado para apresentar autoridade, operação e oportunidades comerciais.",
  },
  {
    client: "AEAA",
    service: "Portal institucional",
    image: "/projetos/1.png",
    challenge:
      "A associação precisava organizar comunicação, notícias, agenda e informações para associados.",
    solution:
      "Estruturamos uma presença digital com áreas de conteúdo, busca profissional e canais de relacionamento.",
    result:
      "Um portal institucional mais completo para comunicação, credibilidade e acesso à informação.",
  },
  {
    client: "Rotary",
    service: "Site institucional",
    image: "/projetos/2.png",
    challenge:
      "O projeto precisava apresentar causas, programas, notícias e formas de participação com linguagem acessível.",
    solution:
      "Organizamos o conteúdo em seções claras, com navegação leve e foco na comunicação dos programas.",
    result:
      "Uma vitrine digital preparada para informar, inspirar e aproximar a comunidade.",
  },
  {
    client: "OrtoSono",
    service: "Site de produtos",
    image: "/projetos/4.png",
    challenge:
      "A marca precisava apresentar produtos, fabricantes e canais de contato em uma experiência simples.",
    solution:
      "Criamos uma página visual com destaque para categorias, sobre a empresa, blog e formulário de contato.",
    result:
      "Um site mais claro para apresentar a marca e facilitar o interesse comercial.",
  },
  {
    client: "EAD Estudie",
    service: "Landing page comercial",
    image: "/projetos/3.png",
    challenge:
      "A campanha precisava comunicar oferta, benefícios, provas sociais e chamada para venda de forma direta.",
    solution:
      "Desenvolvemos uma landing page com narrativa comercial, apresentação do kit e CTAs recorrentes.",
    result:
      "Uma página focada em conversão para apoiar campanhas e aquisição de clientes.",
  },
  ...Array.from({ length: 23 }, (_, index) => {
    const projectNumber = index + 8;

    return {
      client: `Projeto ${projectNumber}`,
      service: "Projeto digital",
      image: `/projetos/${projectNumber}.png`,
      challenge: "Apresentar a marca com clareza e presenca digital profissional.",
      solution: "Criamos uma interface visual alinhada ao posicionamento do projeto.",
      result: "Uma pagina preparada para fortalecer a comunicacao online da marca.",
    };
  }),
];
