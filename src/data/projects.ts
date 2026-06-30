export interface ProjectStage {
  label?: string;
  description: string;
  image?: string;
}

interface ProjectBase {
  id: string;
  title: string;
  date?: string;
  cover?: string;
  tags: string[];
  url: string;
  repo?: string;
  repoPrivate?: boolean;
}

export interface ProjectBig extends ProjectBase {
  type: "big";
  stages: [ProjectStage, ProjectStage, ProjectStage];
}

export interface ProjectSmall extends ProjectBase {
  type: "small";
  banner?: string;
  description: string;
}

export interface ProjectMobile extends ProjectBase {
  type: "mobile";
  // Screens intended for device mockups (ordered). Prefer at least 2 images for a better layout.
  screens: string[];
  // Short description shown below the device mockups
  description: string;
}

export type Project = ProjectBig | ProjectSmall | ProjectMobile;

export const PROJECTS: Project[] = [
  {
    id: "p1",
    type: "big",
    title: "Futcustom",
    cover: "/project-futcustom.png",
    stages: [
      {
        label: "Contexto",
        description:
          "Um cliente me procurou para criar uma plataforma de e-commerce onde torcedores pudessem encomendar cards de futebol personalizados no estilo FIFA — com nome, foto e time. O desafio era transformar um fluxo de customização visual em uma experiência de compra fluida, com entrega física e digital.",
        image: "/futcustom-step01.png",
      },
      {
        label: "Stack & Decisões",
        description:
          "Desenvolvi toda a aplicação com Next.js App Router, TypeScript, Prisma e PostgreSQL. Escolhi Zustand para gerenciar o estado da customização em tempo real e RTK Query para as chamadas de API. Implementei pagamentos via PIX e cartão (Stripe), cálculo de frete com Melhor Envio, internacionalização em três idiomas com next-intl e rastreamento completo de funil via GTM/GA4 com server-side GTM.",
      },
      {
        label: "Entrega",
        description:
          "Entreguei o produto completo — da autenticação ao pós-venda — incluindo painel administrativo, fluxo de checkout com múltiplos métodos de pagamento e entrega, e toda a infraestrutura de analytics. Foi o projeto em que mais tomei decisões de arquitetura de ponta a ponta, desde modelagem de banco até UX do fluxo de compra.",
      },
    ],
    tags: ["Next.js", "TypeScript", "React", "Docker"],
    url: "https://futcustom.com/",
    repoPrivate: true,
  },
  {
    id: "p10",
    type: "big",
    title: "TeflyClass",
    cover: "/project-tefly-class.png",
    stages: [
      {
        description:
          "A ETEJCG não tinha uma plataforma centralizada para gestão acadêmica. Representantes de turma e alunos dependiam de grupos informais para compartilhar atividades, projetos e avisos, tornando o fluxo de informação desorganizado e difícil de rastrear.",
        image: "/teflyclass-step01.png",
      },
      {
        description:
          "Desenvolvi um sistema com controle de acesso baseado em funções, onde representantes de turma e alunos autorizados podem fazer upload de atividades, projetos e comunicados de forma estruturada, centralizando essa responsabilidade dentro da própria plataforma.",
      },
      {
        description:
          "A plataforma passou a organizar o fluxo acadêmico da escola, reduzindo a dependência de meios informais e dando mais visibilidade e controle sobre as demandas de cada turma para alunos e representantes.",
      },
    ],
    tags: ["Nuxt", "Vue", "Node.js"],
    url: "#",

    repo: "https://github.com/GustavoSweb/TeflyClass",
  },
  {
    id: "p3",
    type: "small",
    title: "Frontend News",
    cover: "./project-frontend-news.png",
    description:
      "Desenvolvi uma plataforma de newsletter voltada para desenvolvedores frontend, centralizando atualizações relevantes de bibliotecas como React, Vue e Next.js. O objetivo foi criar um canal curado que poupa tempo de quem acompanha o ecossistema de perto e não quer perder nenhuma novidade importante.",
    tags: ["Next.js", "TypeScript"],
    url: "#",
  },
  {
    id: "p4",
    type: "small",
    title: "ByteFlow",
    cover: "./project-byteflow.png",
    description:
      "Criei a identidade digital da ByteFlow, empresa de soluções tecnológicas que atua desde aplicativos mobile até plataformas web. O site foi construído para transmitir credibilidade técnica e apresentar o portfólio de serviços de forma clara, convertendo visitantes em potenciais clientes.",
    tags: ["React", "TypeScript"],
    url: "https://byteflow-fe.vercel.app/",
    repo: "https://github.com/GustavoSweb/byteflow-fe",
    banner: "/byteflow-step01.png",
  },
  {
    id: "p2",
    type: "big",
    title: "FutBuyNow",
    cover: "/project-futbuynow.png",
    stages: [
      {
        label: "Contexto",
        description:
          "Assumi como freelancer a manutenção e evolução contínua da FutBuyNow, uma plataforma de compra e venda de coins do FC voltada para jogadores globais. O produto já existia, mas acumulava débitos técnicos, gargalos de performance e falta de ferramentas internas para análise e gestão do negócio.",
        image: "/futbuynow-step01.png",
      },
      {
        label: "Abordagem Técnica",
        description:
          "Trabalhei em um monorepo com três aplicações independentes — API Node/Express com Prisma, dashboard React/Vite e loja Next.js com 16 locales via next-intl. Os maiores desafios foram otimizar o sitemap que entrava em timeout em produção (reduzi de ~30s para 2.8s com 1000+ posts) e estruturar configuração dinâmica de bônus via painel admin, filtros no dashboard de pedidos e integração de webhooks do Stripe.",
      },
      {
        label: "Resultado",
        description:
          "Entreguei melhorias mensuráveis, com CLS caindo de 0.47 para 0.1 e o endpoint de sitemap passando de timeout para 2.8s em produção. Além disso, estruturei Docker e GitHub Actions para deploy automatizado no stage, e implementei dezenas de features que aumentaram a operabilidade da plataforma.",
      },
    ],
    tags: ["Next.js", "React", "Node.js", "TypeScript", "Docker"],
    url: "https://www.futbuynow.com/",
    repoPrivate: true,
  },
  {
    id: "p6",
    type: "small",
    title: "Ecommerce Book",
    cover: "./project-ecommerce-book.png",
    description:
      "Construí uma plataforma de compra e venda de ebooks digitais com foco em uma experiência de compra fluida e entrega imediata dos arquivos. O projeto explorou UX para e-commerce digital, integração de pagamento e gerenciamento de licenças por usuário.",
    tags: ["Next.js", "Node.js"],
    url: "#",
    banner: "/ecommerce-book-step01.png",
  },
  {
    id: "p7",
    type: "mobile",
    title: "São João Arcoverde",
    cover: "/project-sao-joao.png",
    screens: ["/screens/sao-joao-1.png", "/screens/sao-joao-2.png", "/screens/sao-joao-3.png"],
    description:
      "Plataforma mobile para visitantes do São João de Arcoverde — diretório de atrações, programação e logística para turistas. Projetada com foco em descoberta rápida, mapas e notificações de última hora.",
    tags: ["React", "TypeScript"],
    url: "#",
  },
  {
    id: "p8",
    type: "small",
    title: "Biomedicina em Ação",
    cover: "./project-biomedicina.png",
    description:
      "Um dos meus primeiros projetos com React, desenvolvido para um evento estudantil na ETEJCG. Construí um blog que centralizou artigos de biomedicina produzidos pelos alunos, oferecendo uma plataforma digital própria que tornou o conteúdo acessível além dos muros da escola. Foi uma excelente oportunidade para aprender sobre estruturação de componentes React e gerenciamento de conteúdo.",
    tags: ["React"],
    url: "#",
  },
  {
    id: "p9",
    type: "small",
    title: "Startup Design",
    cover: "/project-startup.png",
    description:
      "Desenvolvi um modelo de interface de alto impacto para empresas de tecnologia, explorando tipografia expressiva, hierarquia visual forte e uma paleta que comunica inovação. Funciona como referência de design para startups que querem uma presença digital diferenciada e memorável.",
    tags: ["Next.js", "TypeScript"],
    url: "#",
    banner: "/startup-step01.png",
  },
];
