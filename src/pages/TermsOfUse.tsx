import { ArrowLeft, ChevronDown, MessageCircle } from "lucide-react";
import Image from "../components/ui/vite-image";
import { servicePages } from "../data/servicePages";
import { organizationJsonLd, usePageSeo } from "../lib/seo";

const whatsappUrl =
  `https://wa.me/5516996094649?text=${encodeURIComponent("Ola, tudo bem? Acessei os Termos de Uso da CORPAD e gostaria de falar com voces.")}`;

const sections = [
  {
    title: "1. Aceite dos termos",
    content:
      "Ao acessar ou utilizar este site, voce declara estar de acordo com estes Termos de Uso. Caso nao concorde com alguma condicao, recomendamos que interrompa a navegacao.",
  },
  {
    title: "2. Sobre o site",
    content:
      "O site da CORPAD apresenta informacoes institucionais, servicos digitais, consultoria empresarial, portfolio, conteudos e canais de contato. As informacoes podem ser atualizadas, removidas ou ajustadas a qualquer momento.",
  },
  {
    title: "3. Uso permitido",
    content:
      "Voce se compromete a utilizar o site de forma licita, respeitosa e sem tentar comprometer sua seguranca, disponibilidade, conteudo, sistemas, formularios ou canais de atendimento.",
  },
  {
    title: "4. Propriedade intelectual",
    content:
      "Textos, imagens, marcas, logotipos, interfaces, codigos, materiais e demais elementos presentes neste site pertencem a CORPAD ou a terceiros autorizados. A reproducao, copia ou uso comercial sem autorizacao previa nao e permitido.",
  },
  {
    title: "5. Links externos",
    content:
      "Este site pode conter links para plataformas externas, como WhatsApp, redes sociais, ferramentas de atendimento ou sites de terceiros. A CORPAD nao se responsabiliza por conteudos, politicas ou praticas desses ambientes externos.",
  },
  {
    title: "6. Informacoes enviadas pelo usuario",
    content:
      "Ao entrar em contato com a CORPAD por e-mail, WhatsApp, formularios ou outros canais, voce declara que as informacoes fornecidas sao verdadeiras e autoriza seu uso para retorno comercial, atendimento e continuidade da comunicacao solicitada.",
  },
  {
    title: "7. Disponibilidade e alteracoes",
    content:
      "A CORPAD busca manter o site disponivel e atualizado, mas nao garante funcionamento ininterrupto, ausencia de falhas ou compatibilidade permanente com todos os dispositivos, navegadores e redes.",
  },
  {
    title: "8. Limitacao de responsabilidade",
    content:
      "A CORPAD nao se responsabiliza por danos decorrentes de mau uso do site, indisponibilidades temporarias, interpretacao inadequada das informacoes publicadas ou problemas causados por terceiros.",
  },
  {
    title: "9. Atualizacao destes termos",
    content:
      "Estes Termos de Uso podem ser atualizados a qualquer momento para refletir mudancas nos servicos, no site ou em exigencias legais. A versao publicada nesta pagina sera sempre a versao vigente.",
  },
  {
    title: "10. Contato",
    content:
      "Em caso de duvidas sobre estes Termos de Uso, entre em contato pelo e-mail contato@corpad.com.br ou pelos canais oficiais informados no site.",
  },
];

export default function TermsOfUsePage() {
  usePageSeo({
    title: "Termos de Uso | CORPAD",
    description:
      "Consulte os Termos de Uso do site da CORPAD, com regras de acesso, uso permitido, propriedade intelectual, responsabilidades e canais de contato.",
    path: "/termos-de-uso",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Termos de Uso | CORPAD",
      url: "https://corpad.com.br/termos-de-uso",
      publisher: organizationJsonLd(),
    },
  });

  return (
    <main className="legal-page">
      <header className="navbar">
        <a className="brand" href="/" aria-label="Pagina inicial">
          <Image
            className="brand-logo"
            src="/logo.png"
            alt="Logo CORPAD"
            width={1500}
            height={390}
            priority
          />
        </a>

        <nav className="nav-links" aria-label="Navegacao principal">
          <a href="/corpad-digital#sobre">Sobre</a>
          <div className="nav-menu">
            <a className="nav-menu-trigger" href="/corpad-digital#servicos">
              Servicos <ChevronDown size={14} strokeWidth={2.2} />
            </a>
            <div className="nav-submenu" aria-label="Servicos">
              {servicePages.map((item) => (
                <a href={`/servicos/${item.slug}`} key={item.slug}>
                  {item.navLabel}
                </a>
              ))}
            </div>
          </div>
          <a href="/portfolio">Portfolio</a>
          <a href="/clientes">Clientes</a>
          <a href="/blog">Blog</a>
          <a href="/corpad-digital#contato">Contato</a>
        </nav>

        <div className="nav-actions">
          <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp <MessageCircle size={15} />
          </a>
        </div>
      </header>

      <section className="legal-hero">
        <a className="legal-back-link" href="/">
          <ArrowLeft size={16} />
          Voltar ao portal
        </a>
        <span className="section-kicker">CORPAD</span>
        <h1>Termos de Uso</h1>
        <p>
          Regras gerais para acesso, navegacao e uso das informacoes,
          conteudos e canais disponiveis no site da CORPAD.
        </p>
        <small>Ultima atualizacao: 09 de junho de 2026</small>
      </section>

      <section className="legal-content" aria-label="Conteudo dos Termos de Uso">
        {sections.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
