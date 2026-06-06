export type ClientLogo = {
  name: string;
  initials: string;
  segment: string;
  logo?: string;
};

type ClientLogoSource = {
  name: string;
  segment: string;
  file: string;
};

const logoPath = (file: string) => `/logotiposclientes/${file}`;

const getInitials = (name: string) =>
  name
    .replace(/\([^)]*\)/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

const clientLogoSources: ClientLogoSource[] = [
  {
    name: "Maktub B Joias",
    segment: "Joias e acessorios",
    file: "Logo-Maktub-B-Joias-1.png.webp",
  },
  {
    name: "Instituto Sirio",
    segment: "Saude",
    file: "Logo-Instituto-Sirio.png",
  },
  {
    name: "Clinica da Cidade",
    segment: "Saude",
    file: "Logo-CLINICA-DA-CIDADE-pequeno.png",
  },
  {
    name: "Casa Brasil",
    segment: "Institucional",
    file: "Logo-CASA-BRASIL-Pequeno.png",
  },
  {
    name: "Le Charme",
    segment: "Beleza e estetica",
    file: "le_charme.webp",
  },
  {
    name: "Jornal Cidade Sonho",
    segment: "Comunicacao",
    file: "jornal-cidade-sonho.webp",
  },
  {
    name: "Homem Alpha",
    segment: "Saude e bem-estar",
    file: "homem-alpha.webp",
  },
  {
    name: "Escrito Logo em Azul",
    segment: "Cliente",
    file: "Escrito-Logo-em-Azul.png",
  },
  {
    name: "DMF Medical",
    segment: "Saude",
    file: "dmfF-medical.webp",
  },
  {
    name: "Design Sem Nome 9",
    segment: "Cliente",
    file: "Design_sem_nome__9_-removebg-preview.png",
  },
  {
    name: "Design Sem Nome 8",
    segment: "Cliente",
    file: "Design_sem_nome__8_-removebg-preview.png",
  },
  {
    name: "Design Sem Nome 10",
    segment: "Cliente",
    file: "Design_sem_nome__10___1_-removebg-preview.png",
  },
  {
    name: "Cliente 2",
    segment: "Cliente",
    file: "2.png",
  },
  {
    name: "Cliente 3",
    segment: "Cliente",
    file: "3.png",
  },
  {
    name: "Cliente 4",
    segment: "Cliente",
    file: "4.png",
  },
  {
    name: "Andre Nakao",
    segment: "Cliente",
    file: "Logotipo-Andre-Nakao.png",
  },
  {
    name: "AN Coaching",
    segment: "Coaching",
    file: "Logotipo-AN-Coaching-2.png.webp",
  },
  {
    name: "Alpine Medical",
    segment: "Saude",
    file: "Logotipo-Alpine-Medical.png.webp",
  },
  {
    name: "Alessandra Corsi Podologa",
    segment: "Saude",
    file: "Logotipo-Alessandra-Corsi-Podologa.webp",
  },
  {
    name: "AEAA T",
    segment: "Associacao profissional",
    file: "Logotipo-AEAAT.webp",
  },
  {
    name: "AEAA MA",
    segment: "Associacao profissional",
    file: "Logotipo-AEAAMA.webp",
  },
  {
    name: "Be Happy Escorts",
    segment: "Cliente",
    file: "Logotipo-BE-HAPPY-ESCORTS-150x150.png",
  },
  {
    name: "Avant Medical",
    segment: "Saude",
    file: "Logotipo-Avant-Medical.png",
  },
  {
    name: "APAE Monte Alto",
    segment: "Institucional",
    file: "Logotipo-APAE-Monte-Alto-2.png.webp",
  },
  {
    name: "Biosigma",
    segment: "Saude",
    file: "Logotipo-Biosigma__1_-removebg-preview.png",
  },
  {
    name: "Boneca de Pano",
    segment: "Varejo",
    file: "Logotipo-Boneca-de-Pano.webp",
  },
  {
    name: "BR Tax",
    segment: "Consultoria",
    file: "Logotipo-BR-Tax__1_-removebg-preview.png",
  },
  {
    name: "BR Build",
    segment: "Construcao",
    file: "Logotipo-BR-Build.png.webp",
  },
  {
    name: "Busque Caieiras",
    segment: "Portal local",
    file: "Logotipo-Busque-Caieiras.webp",
  },
  {
    name: "Total Rede",
    segment: "Servicos",
    file: "total_rede.webp",
  },
  {
    name: "TK Soft",
    segment: "Tecnologia",
    file: "tk_soft.webp",
  },
  {
    name: "Rotary Club",
    segment: "Institucional",
    file: "rotary_club.webp",
  },
  {
    name: "Web Do Carro",
    segment: "Automotivo",
    file: "Logotipo-Web-Do-Carro.webp",
  },
  {
    name: "UFX",
    segment: "Cliente",
    file: "Logotipo-UFX.webp",
  },
  {
    name: "SSBM",
    segment: "Cliente",
    file: "Logotipo-SSBM.webp",
  },
  {
    name: "Spineedle",
    segment: "Saude",
    file: "Logotipo-Spineedle.webp",
  },
  {
    name: "Salvador Medical",
    segment: "Saude",
    file: "Logotipo-Salvador-Medical-2.png.webp",
  },
  {
    name: "Salla e-Commerce",
    segment: "E-commerce",
    file: "Logotipo-Salla-e-Commerce.webp",
  },
  {
    name: "Renova Medical",
    segment: "Saude",
    file: "Logotipo-Renova-Medical.webp",
  },
  {
    name: "Regis Automoveis",
    segment: "Automotivo",
    file: "Logotipo-Regis-Automoveis.png",
  },
  {
    name: "Rave Tecnologica",
    segment: "Tecnologia",
    file: "Logotipo-Rave-Tecnologica.png.webp",
  },
  {
    name: "Pereira Martins Advogados",
    segment: "Advocacia",
    file: "Logotipo-Pereira-Martins-Advogados-1.png.webp",
  },
  {
    name: "Pedro Henrique Magalhaes Odontologia",
    segment: "Saude",
    file: "Logotipo-Pedro-Henrique-Magalhaes-Odontologia.webp",
  },
  {
    name: "Painmed",
    segment: "Saude",
    file: "Logotipo-Painmed.webp",
  },
  {
    name: "OrtoSono",
    segment: "Produtos e varejo",
    file: "Logotipo-Ortosono.webp",
  },
  {
    name: "Orthoprime",
    segment: "Saude",
    file: "Logotipo-Orthoprime-2.png",
  },
  {
    name: "Optin Mobi",
    segment: "Tecnologia",
    file: "Logotipo-Optin-Mobi.webp",
  },
  {
    name: "NL Financas",
    segment: "Financas",
    file: "Logotipo-NL-Financas.webp",
  },
  {
    name: "Nimbus",
    segment: "Tecnologia",
    file: "Logotipo-Nimbus.webp",
  },
  {
    name: "Neomanligth",
    segment: "Cliente",
    file: "Logotipo-Neomanligth.png-1.webp",
  },
  {
    name: "Medic",
    segment: "Saude",
    file: "Logotipo-Medic.webp",
  },
  {
    name: "Medfactor",
    segment: "Saude",
    file: "Logotipo-Medfactor.png.webp",
  },
  {
    name: "Mais Mulher",
    segment: "Saude",
    file: "Logotipo-Mais-Mulher.png.webp",
  },
  {
    name: "Lobus Medical",
    segment: "Saude",
    file: "Logotipo-Lobus-Medical.png.webp",
  },
  {
    name: "Leao Amigo",
    segment: "Institucional",
    file: "Logotipo-Leao-Amigo.webp",
  },
  {
    name: "Lapaz Revista",
    segment: "Comunicacao",
    file: "Logotipo-Lapaz-Revista__1_-removebg-preview.png",
  },
  {
    name: "Jungle Web",
    segment: "Tecnologia",
    file: "Logotipo-Jungle-Web-909x1024-1.webp",
  },
  {
    name: "Jornal Connect",
    segment: "Comunicacao",
    file: "Logotipo-Jornal-Connect.webp",
  },
  {
    name: "INEC SP",
    segment: "Institucional",
    file: "Logotipo-INEC-SP.png.webp",
  },
  {
    name: "HY Locadora",
    segment: "Locacao",
    file: "Logotipo-HY-Locadora.png.webp",
  },
  {
    name: "Hobby Mania",
    segment: "Varejo",
    file: "Logotipo-Hobby-Mania-1.webp",
  },
  {
    name: "Grupo Viriato",
    segment: "Cliente",
    file: "Logotipo-Grupo-Viriato-1024x703__1_-removebg-preview.png",
  },
  {
    name: "GRC Dental Parts",
    segment: "Saude",
    file: "Logotipo-GRC-Dental-Parts.png.webp",
  },
  {
    name: "GMS",
    segment: "Cliente",
    file: "Logotipo-GMS.webp",
  },
  {
    name: "Global Trade",
    segment: "Comercio exterior",
    file: "Logotipo-Global-Trade.webp",
  },
  {
    name: "Girou Potiguar",
    segment: "Cliente",
    file: "Logotipo-Girou-Potiguar.png",
  },
  {
    name: "Fibra TK",
    segment: "Tecnologia",
    file: "Logotipo-Fibra-TK.webp",
  },
  {
    name: "Expresso Brasil",
    segment: "Logistica",
    file: "Logotipo-Expresso-Brasil-removebg-preview.png",
  },
  {
    name: "Essencia de Gaya",
    segment: "Bem-estar",
    file: "Logotipo-Essencia-de-Gaya.webp",
  },
  {
    name: "EPI Evolucao",
    segment: "Seguranca do trabalho",
    file: "Logotipo-EPI-Evolucao-1.png.webp",
  },
  {
    name: "EAD Estudos",
    segment: "Educacao",
    file: "Logotipo-EAD-Estudos.webp",
  },
  {
    name: "e-Lab Commerce",
    segment: "E-commerce",
    file: "Logotipo-e-Lab-Commerce.webp",
  },
  {
    name: "e-Construnet",
    segment: "Construcao",
    file: "Logotipo-e-Construnet.webp",
  },
  {
    name: "DNA Bio",
    segment: "Saude",
    file: "Logotipo-DNA-Bio.png",
  },
  {
    name: "De Proposito",
    segment: "Cliente",
    file: "Logotipo-De-Proposito.webp",
  },
  {
    name: "Confianca Moveis Planejados",
    segment: "Moveis planejados",
    file: "Logotipo-Confianca-Moveis-Planejados.webp",
  },
  {
    name: "Compasso Administracao Judicial",
    segment: "Administracao judicial",
    file: "Logotipo-Compasso-Administracao-Judicial.webp",
  },
  {
    name: "Comercial Vidoto",
    segment: "Comercio",
    file: "Logotipo-Comercial-Vidoto.webp",
  },
  {
    name: "Clinica Principia",
    segment: "Saude",
    file: "Logotipo-Clinica-Principia.png",
  },
  {
    name: "Clinica Monteiro",
    segment: "Saude",
    file: "Logotipo-Clinica-Monteiro.png.webp",
  },
  {
    name: "Clinica Dia Medicina",
    segment: "Saude",
    file: "Logotipo-Clinica-Dia-Medicina.webp",
  },
  {
    name: "Clinica Dia Medicina 1",
    segment: "Saude",
    file: "Logotipo-Clinica-Dia-Medicina (1).webp",
  },
  {
    name: "Clinica Alano",
    segment: "Saude",
    file: "Logotipo-Clinica-Alano.png",
  },
  {
    name: "Cleid Barbosa",
    segment: "Cliente",
    file: "Logotipo-Cleid-Barbosa.webp",
  },
  {
    name: "Casa do Vovo",
    segment: "Institucional",
    file: "Logotipo-Casa-do-Vovo.png",
  },
  {
    name: "Camara Municipal de Monte Alto",
    segment: "Institucional",
    file: "Logotipo-Camera-Municipal-de-Monte-Alto.webp",
  },
  {
    name: "Caff Seguros",
    segment: "Seguros",
    file: "Logotipo-Caff-Seguros.png",
  },
  {
    name: "Cacau Style",
    segment: "Varejo",
    file: "Logotipo-Cacau-Style.png__1_-removebg-preview.png",
  },
];

export const clientLogos: ClientLogo[] = clientLogoSources.map((client) => ({
  name: client.name,
  initials: getInitials(client.name),
  segment: client.segment,
  logo: logoPath(client.file),
}));

export const featuredClientLogos: ClientLogo[] = clientLogos.slice(0, 10);
