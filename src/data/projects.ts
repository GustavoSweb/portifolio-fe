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
    title: "Projeto 1",
    cover: undefined,
    stages: [
      { description: "Descrição do contexto do projeto." },
      { description: "Descrição da abordagem utilizada." },
      { description: "Descrição do resultado obtido." },
    ],
    tags: ["Next.js", "TypeScript"],
    url: "#",
  },
  {
    id: "p2",
    type: "big",
    title: "Projeto 2",
    cover: undefined,
    stages: [
      { description: "Descrição do contexto do projeto." },
      { description: "Descrição da abordagem utilizada." },
      { description: "Descrição do resultado obtido." },
    ],
    tags: ["React", "Node.js"],
    url: "#",
  },
  {
    id: "p3",
    type: "small",
    title: "Projeto 3",
    cover: undefined,
    description: "Descrição resumida do projeto.",
    tags: ["Vue", "Docker"],
    url: "#",
  },
  {
    id: "p4",
    type: "small",
    title: "Projeto 4",
    cover: undefined,
    description: "Descrição resumida do projeto.",
    tags: ["AWS", "Kubernetes"],
    url: "#",
  },
  {
    id: "p5",
    type: "big",
    title: "Projeto 5",
    cover: undefined,
    stages: [
      { description: "Descrição do contexto do projeto." },
      { description: "Descrição da abordagem utilizada." },
      { description: "Descrição do resultado obtido." },
    ],
    tags: ["React", "TypeScript"],
    url: "#",
  },
  {
    id: "p6",
    type: "small",
    title: "Projeto 6",
    cover: undefined,
    description: "Descrição resumida do projeto.",
    tags: ["Next.js", "Node.js"],
    url: "#",
  },
  {
    id: "p7",
    type: "big",
    title: "Projeto 7",
    cover: undefined,
    stages: [
      { description: "Descrição do contexto do projeto." },
      { description: "Descrição da abordagem utilizada." },
      { description: "Descrição do resultado obtido." },
    ],
    tags: ["React", "AWS"],
    url: "#",
  },
  {
    id: "p8",
    type: "small",
    title: "Projeto 8",
    cover: undefined,
    description: "Descrição resumida do projeto.",
    tags: ["Docker", "Kubernetes"],
    url: "#",
  },
  {
    id: "p9",
    type: "big",
    title: "Projeto 9",
    cover: undefined,
    stages: [
      { description: "Descrição do contexto do projeto." },
      { description: "Descrição da abordagem utilizada." },
      { description: "Descrição do resultado obtido." },
    ],
    tags: ["Next.js", "TypeScript"],
    url: "#",
  },
];
