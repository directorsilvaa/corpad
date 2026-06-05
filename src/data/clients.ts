export type ClientLogo = {
  name: string;
  initials: string;
  segment: string;
  logo?: string;
};

export const clientLogos: ClientLogo[] = [
  {
    name: "AEAA MA",
    initials: "AE",
    segment: "Associação profissional",
    logo: "/logotiposclientes/Logotipo-AEAAMA.webp",
  },
  {
    name: "AEAA T",
    initials: "AT",
    segment: "Associação profissional",
    logo: "/logotiposclientes/Logotipo-AEAAT.webp",
  },
  {
    name: "Rotary Club",
    initials: "RC",
    segment: "Institucional",
    logo: "/logotiposclientes/rotary_club.webp",
  },
  {
    name: "OrtoSono",
    initials: "OS",
    segment: "Produtos e varejo",
    logo: "/logotiposclientes/Logotipo-Ortosono.webp",
  },
  {
    name: "Clínica Principia",
    initials: "CP",
    segment: "Saúde",
    logo: "/logotiposclientes/Logotipo-Clinica-Principia.png",
  },
  {
    name: "EAD Estudos",
    initials: "ED",
    segment: "Educação",
    logo: "/logotiposclientes/Logotipo-EAD-Estudos.webp",
  },
  {
    name: "Casa Brasil",
    initials: "CB",
    segment: "Institucional",
    logo: "/logotiposclientes/Logo-CASA-BRASIL-Pequeno.png",
  },
  {
    name: "Instituto Sírio",
    initials: "IS",
    segment: "Saúde",
    logo: "/logotiposclientes/Logo-Instituto-Sirio.png",
  },
  {
    name: "Global Trade",
    initials: "GT",
    segment: "Comércio exterior",
    logo: "/logotiposclientes/Logotipo-Global-Trade.webp",
  },
  {
    name: "TK Soft",
    initials: "TK",
    segment: "Tecnologia",
    logo: "/logotiposclientes/tk_soft.webp",
  },
  {
    name: "Total Rede",
    initials: "TR",
    segment: "Serviços",
    logo: "/logotiposclientes/total_rede.webp",
  },
  {
    name: "Medfactor",
    initials: "MF",
    segment: "Saúde",
    logo: "/logotiposclientes/Logotipo-Medfactor.png.webp",
  },
  {
    name: "Clínica Alano",
    initials: "CA",
    segment: "Saúde",
    logo: "/logotiposclientes/Logotipo-Clinica-Alano.png",
  },
  {
    name: "Rave Tecnológica",
    initials: "RT",
    segment: "Tecnologia",
    logo: "/logotiposclientes/Logotipo-Rave-Tecnologica.png.webp",
  },
  {
    name: "BR Tax",
    initials: "BT",
    segment: "Consultoria",
    logo: "/logotiposclientes/Logotipo-BR-Tax__1_-removebg-preview.png",
  },
  {
    name: "Clínica da Cidade",
    initials: "CC",
    segment: "Saúde",
    logo: "/logotiposclientes/Logo-CLINICA-DA-CIDADE-pequeno.png",
  },
];

export const featuredClientLogos: ClientLogo[] = clientLogos.slice(0, 10);
