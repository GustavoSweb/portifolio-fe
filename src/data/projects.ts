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

export type Project = ProjectBig | ProjectSmall;

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
    id: "p2",
    type: "big",
    title: "FutBuyNow",
    cover: "/project-futbuynow.png",
    stages: [
      {
        label: "Contexto",
        description:
          "Assumi como freelancer a manutenção e evolução contínua da FutBuyNow, uma plataforma de compra e venda de coins do FC voltada para jogadores globais. O produto já existia, mas acumulava débitos técnicos, gargalos de performance e falta de ferramentas internas para análise e gestão do negócio.",
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
    id: "p3",
    type: "small",
    title: "Frontend News",
    cover: undefined,
    description:
      "Desenvolvi uma plataforma de newsletter voltada para desenvolvedores frontend, centralizando atualizações relevantes de bibliotecas como React, Vue e Next.js. O objetivo foi criar um canal curado que poupa tempo de quem acompanha o ecossistema de perto e não quer perder nenhuma novidade importante.",
    tags: ["Next.js", "TypeScript"],
    url: "#",
  },
  {
    id: "p4",
    type: "small",
    title: "ByteFlow",
    cover: undefined,
    description:
      "Criei a identidade digital da ByteFlow, empresa de soluções tecnológicas que atua desde aplicativos mobile até plataformas web. O site foi construído para transmitir credibilidade técnica e apresentar o portfólio de serviços de forma clara, convertendo visitantes em potenciais clientes.",
    tags: ["React", "TypeScript"],
    url: "#",
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
    id: "p6",
    type: "small",
    title: "Ecommerce Book",
    cover: undefined,
    description:
      "Construí uma plataforma de compra e venda de ebooks digitais com foco em uma experiência de compra fluida e entrega imediata dos arquivos. O projeto explorou UX para e-commerce digital, integração de pagamento e gerenciamento de licenças por usuário.",
    tags: ["Next.js", "Node.js"],
    url: "#",
  },
  {
    id: "p7",
    type: "small",
    title: "São João Arcoverde",
    cover: "/project-sao-joao.png",
    description:
      "Desenvolvi uma plataforma municipal para o São João de Arcoverde, um dos maiores festivais juninos de Pernambuco. O sistema orienta turistas sobre atrações, programações e opções de transporte durante o evento, reduzindo a dependência de informações dispersas em redes sociais.",
    tags: ["React", "TypeScript"],
    url: "#",
  },
  {
    id: "p8",
    type: "small",
    title: "Biomedicina em Ação",
    cover: undefined,
    description:
      "Construí um blog informativo para um evento estudantil na Escola Técnica Estadual Jornalista Cyl Galindo. O projeto reuniu artigos de biomedicina produzidos pelos alunos em um espaço digital próprio, tornando o conteúdo acessível além dos muros da escola.",
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
  },
];
