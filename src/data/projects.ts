export interface Project {
  id: string;
  title: string;
  date?: string;
  description: string;
  tags: string[];
  url: string;
  repo?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Projeto 1",
    description: "Descrição do projeto.",
    tags: ["Next.js", "TypeScript"],
    url: "#",
  },
  {
    id: "p2",
    title: "Projeto 2",
    description: "Descrição do projeto.",
    tags: ["React", "Node.js"],
    url: "#",
  },
  {
    id: "p3",
    title: "Projeto 3",
    description: "Descrição do projeto.",
    tags: ["Vue", "Docker"],
    url: "#",
  },
  {
    id: "p4",
    title: "Projeto 4",
    description: "Descrição do projeto.",
    tags: ["AWS", "Kubernetes"],
    url: "#",
  },
  {
    id: "p5",
    title: "Projeto 5",
    description: "Descrição do projeto.",
    tags: ["React", "TypeScript"],
    url: "#",
  },
  {
    id: "p6",
    title: "Projeto 6",
    description: "Descrição do projeto.",
    tags: ["Next.js", "Node.js"],
    url: "#",
  },
  {
    id: "p7",
    title: "Projeto 7",
    description: "Descrição do projeto.",
    tags: ["React", "AWS"],
    url: "#",
  },
  {
    id: "p8",
    title: "Projeto 8",
    description: "Descrição do projeto.",
    tags: ["Docker", "Kubernetes"],
    url: "#",
  },
  {
    id: "p9",
    title: "Projeto 9",
    description: "Descrição do projeto.",
    tags: ["Next.js", "TypeScript"],
    url: "#",
  },
];
