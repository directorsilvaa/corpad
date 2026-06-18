import { ArrowLeft, ChevronDown, MessageCircle } from "lucide-react";
import Image from "../components/ui/vite-image";
import { servicePages } from "../data/servicePages";
import { organizationJsonLd, usePageSeo } from "../lib/seo";

const whatsappUrl =
  `https://wa.me/5516996094649?text=${encodeURIComponent("Ola, tudo bem? Acessei os Termos de Uso da CORPAD e gostaria de falar com voces.")}`;

const sections = [
  {
    title: "1. Identificação e Aceitação",
    content: (
      <>
        <p>
          Estes Termos de Uso regem o acesso e a utilização do site <strong>corpad.com.br</strong> e de todos os seus
          subdomínios e páginas relacionadas (doravante "Site"), de propriedade e operados por:
        </p>
        <blockquote>
          <strong>CORPAD Soluções Digitais e Consultoria Empresarial</strong>
          <br />
          CNPJ: 01.434.659/0001-19
          <br />
          E-mail: contato@corpad.com.br
          <br />
          Site: https://corpad.com.br
        </blockquote>
        <p>
          Ao acessar ou utilizar o Site, o usuário declara ter lido, compreendido e concordado integralmente com estes
          Termos. Caso não concorde com qualquer disposição, solicitamos que se abstenha de utilizar o Site.
        </p>
      </>
    ),
  },
  {
    title: "2. Definições",
    content: (
      <>
        <p>Para fins destes Termos, considera-se:</p>
        <ul>
          <li>
            <strong>CORPAD:</strong> a empresa titular do Site, conforme identificada na cláusula 1.
          </li>
          <li>
            <strong>Usuário:</strong> qualquer pessoa física ou jurídica que acesse o Site, independentemente de
            cadastro.
          </li>
          <li>
            <strong>Serviços:</strong> todas as soluções e atividades disponibilizadas pela CORPAD, incluindo criação de
            sites, hospedagem, e-commerce, marketing digital, gestão de redes sociais, banco de dados, consultoria em TI,
            telefonia em nuvem e inteligência de dados.
          </li>
          <li>
            <strong>Conteúdo:</strong> textos, imagens, vídeos, logotipos, marcas, layouts e demais elementos
            disponíveis no Site.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Descrição do Site e dos Serviços",
    content: (
      <>
        <p>
          O Site tem caráter institucional e comercial, destinado a apresentar os serviços da CORPAD, captar contatos e
          fornecer informações sobre as soluções oferecidas, que incluem:
        </p>
        <p>
          <strong>CORPAD Digital</strong>
        </p>
        <ul>
          <li>Criação de sites e landing pages</li>
          <li>Hospedagem de sites com alta performance</li>
          <li>Desenvolvimento de e-commerce (WooCommerce, Magento e outras plataformas)</li>
          <li>Marketing digital e gestão de tráfego pago</li>
          <li>Gestão de redes sociais</li>
          <li>Monitoramento, otimização e manutenção de banco de dados</li>
        </ul>
        <p>
          <strong>CORPAD Consultoria</strong>
        </p>
        <ul>
          <li>Consultoria e assessoria em Tecnologia da Informação (TI)</li>
          <li>Inteligência de dados e análise estratégica</li>
          <li>Telefonia em nuvem com PABX, URA e transferências externas</li>
          <li>Estratégia empresarial e transformação digital</li>
        </ul>
        <p>
          As informações e cotações disponibilizadas no Site são meramente ilustrativas e não constituem proposta
          vinculante. A contratação efetiva de qualquer serviço depende de proposta formal e assinatura de contrato
          específico entre as partes.
        </p>
      </>
    ),
  },
  {
    title: "4. Uso Permitido",
    content: (
      <>
        <p>O usuário pode utilizar o Site para:</p>
        <ul>
          <li>Obter informações sobre os serviços oferecidos pela CORPAD;</li>
          <li>Entrar em contato para solicitar orçamentos, reuniões ou suporte;</li>
          <li>Navegar pelo conteúdo institucional e portfólio disponíveis;</li>
          <li>Compartilhar links do Site em redes sociais e canais digitais.</li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Uso Proibido",
    content: (
      <>
        <p>É vedado ao usuário:</p>
        <ul>
          <li>Utilizar o Site para fins ilícitos, fraudulentos ou que violem direitos de terceiros;</li>
          <li>
            Reproduzir, copiar, distribuir, modificar ou explorar comercialmente qualquer conteúdo do Site sem
            autorização prévia e por escrito da CORPAD;
          </li>
          <li>
            Submeter ao Site vírus, malware, scripts maliciosos ou qualquer código que possa comprometer a segurança ou
            o funcionamento do sistema;
          </li>
          <li>Realizar tentativas de acesso não autorizado a sistemas, servidores ou bases de dados da CORPAD;</li>
          <li>Usar mecanismos automatizados (bots, scrapers, crawlers) para extração de dados sem consentimento expresso;</li>
          <li>
            Publicar ou transmitir conteúdo difamatório, ofensivo, discriminatório ou que viole a legislação brasileira
            vigente.
          </li>
        </ul>
        <p>
          O descumprimento dessas proibições poderá ensejar as medidas legais cabíveis, incluindo ação civil e
          comunicação às autoridades competentes.
        </p>
      </>
    ),
  },
  {
    title: "6. Propriedade Intelectual",
    content: (
      <>
        <p>
          Todo o conteúdo disponível no Site - incluindo, mas não se limitando a textos, imagens, ilustrações,
          logotipos, marcas, identidade visual, layouts, código-fonte e demais elementos - é de propriedade exclusiva da
          CORPAD ou de seus licenciantes, protegido pela Lei nº 9.610/1998 (Lei de Direitos Autorais) e pela Lei nº
          9.279/1996 (Lei de Propriedade Industrial).
        </p>
        <p>A marca <strong>CORPAD®</strong> é registrada e seu uso não autorizado constitui infração legal.</p>
        <p>
          Nenhuma disposição destes Termos deve ser interpretada como concessão de licença, cessão ou transferência de
          qualquer direito de propriedade intelectual ao usuário.
        </p>
      </>
    ),
  },
  {
    title: "7. Privacidade e Proteção de Dados",
    content: (
      <>
        <p>
          O tratamento de dados pessoais coletados neste Site é realizado em conformidade com a{" "}
          <strong>Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018)</strong>.
        </p>
        <p>
          As informações fornecidas voluntariamente pelo usuário (nome, e-mail, telefone, empresa) por meio de
          formulários de contato são utilizadas exclusivamente para:
        </p>
        <ul>
          <li>Responder às solicitações e dúvidas enviadas;</li>
          <li>Encaminhar propostas comerciais e orçamentos solicitados;</li>
          <li>Enviar comunicações sobre serviços da CORPAD, mediante consentimento.</li>
        </ul>
        <p>
          A CORPAD não comercializa dados pessoais de usuários a terceiros. Para mais detalhes sobre coleta,
          armazenamento, uso e direitos do titular, consulte nossa <strong>Política de Privacidade</strong> disponível em:{" "}
          <a href="https://corpad.com.br/privacidade">https://corpad.com.br/privacidade</a>.
        </p>
      </>
    ),
  },
  {
    title: "8. Cookies",
    content: (
      <>
        <p>
          O Site utiliza cookies e tecnologias similares para melhorar a experiência de navegação, analisar o desempenho
          do Site e viabilizar funcionalidades. Ao continuar navegando, o usuário consente com o uso de cookies não
          essenciais.
        </p>
        <p>
          O usuário pode gerenciar ou desativar cookies a qualquer momento pelas configurações do seu navegador, o que
          poderá impactar algumas funcionalidades do Site.
        </p>
      </>
    ),
  },
  {
    title: "9. Links para Sites de Terceiros",
    content: (
      <>
        <p>
          O Site pode conter links para sites externos. Esses links são fornecidos apenas por conveniência e não implicam
          endosso, aprovação ou responsabilidade da CORPAD sobre o conteúdo, serviços ou práticas de privacidade de sites
          de terceiros.
        </p>
        <p>O usuário acessa esses sites por conta própria e sob sua inteira responsabilidade.</p>
      </>
    ),
  },
  {
    title: "10. Limitação de Responsabilidade",
    content: (
      <>
        <p>A CORPAD envida esforços para manter o Site disponível, atualizado e seguro, porém não garante:</p>
        <ul>
          <li>Disponibilidade ininterrupta ou livre de erros;</li>
          <li>Exatidão absoluta das informações publicadas;</li>
          <li>Ausência de vírus ou outros elementos nocivos no Site ou em arquivos disponibilizados.</li>
        </ul>
        <p>
          A CORPAD não se responsabiliza por danos diretos, indiretos, incidentais ou consequentes decorrentes do uso ou
          da impossibilidade de uso do Site, exceto nos casos em que a legislação brasileira exija responsabilidade.
        </p>
      </>
    ),
  },
  {
    title: "11. Isenção de Garantias Sobre Resultados",
    content: (
      <p>
        As informações, estimativas e cases apresentados no Site têm caráter meramente ilustrativo. A CORPAD não garante
        resultados específicos decorrentes da contratação de seus serviços, pois os resultados dependem de fatores
        externos e variáveis inerentes a cada projeto e mercado.
      </p>
    ),
  },
  {
    title: "12. Alterações nos Termos",
    content: (
      <>
        <p>
          A CORPAD reserva-se o direito de modificar estes Termos a qualquer momento, publicando a versão atualizada
          nesta página com a indicação da data de revisão. O uso continuado do Site após a publicação de alterações
          constitui aceitação das novas condições.
        </p>
        <p>Recomendamos que o usuário consulte periodicamente esta página.</p>
      </>
    ),
  },
  {
    title: "13. Rescisão e Suspensão de Acesso",
    content: (
      <p>
        A CORPAD pode, a seu exclusivo critério e sem aviso prévio, suspender ou encerrar o acesso de qualquer usuário
        ao Site que viole estes Termos ou que utilize o Site de forma inadequada, sem que isso gere qualquer direito a
        indenização.
      </p>
    ),
  },
  {
    title: "14. Lei Aplicável e Foro",
    content: (
      <p>
        Estes Termos são regidos pelas leis da <strong>República Federativa do Brasil</strong>. Fica eleito o foro da{" "}
        <strong>Comarca de Ribeirão Preto - SP</strong> para dirimir quaisquer controvérsias decorrentes destes Termos,
        com renúncia expressa a qualquer outro, por mais privilegiado que seja.
      </p>
    ),
  },
  {
    title: "15. Contato",
    content: (
      <>
        <p>Para dúvidas, solicitações ou reclamações relacionadas a estes Termos:</p>
        <ul>
          <li>
            <strong>E-mail:</strong> contato@corpad.com.br
          </li>
          <li>
            <strong>Site:</strong> https://corpad.com.br
          </li>
          <li>
            <strong>CNPJ:</strong> 01.434.659/0001-19
          </li>
        </ul>
        <p>
          <em>CORPAD® | Todos os direitos reservados desde 1996.</em>
        </p>
      </>
    ),
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
            src="/logo.png?v=20260618"
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
        <small>Última atualização: junho de 2026</small>
      </section>

      <section className="legal-content" aria-label="Conteudo dos Termos de Uso">
        {sections.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>
            {section.content}
          </article>
        ))}
      </section>
    </main>
  );
}
