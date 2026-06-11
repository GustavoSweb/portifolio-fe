export interface Project {
  title: string;
  description: string;
  tags: string[];
  url: string;
  repo?: string;
}

/**
 * Cada entrada mapeia, em ordem, para os polígonos grandes do mosaico:
 * polígono SVG índices (0-based): 1, 3, 4, 6, 9, 10, 11, 14, 15
 */
export const PROJECTS: Project[] = [
  {
    title: "Projeto 1",
    description: "Descrição do projeto.",
    tags: ["Next.js", "TypeScript"],
    url: "#",
  },
  {
    title: "Projeto 2",
    description: "Descrição do projeto.",
    tags: ["React", "Node.js"],
    url: "#",
  },
  {
    title: "Projeto 3",
    description: "Descrição do projeto.",
    tags: ["Vue", "Docker"],
    url: "#",
  },
  {
    title: "Projeto 4",
    description: "Descrição do projeto.",
    tags: ["AWS", "Kubernetes"],
    url: "#",
  },
  {
    title: "Projeto 5",
    description: "Descrição do projeto.",
    tags: ["React", "TypeScript"],
    url: "#",
  },
  {
    title: "Projeto 6",
    description: "Descrição do projeto.",
    tags: ["Next.js", "Node.js"],
    url: "#",
  },
  {
    title: "Projeto 7",
    description: "Descrição do projeto.",
    tags: ["React", "AWS"],
    url: "#",
  },
  {
    title: "Projeto 8",
    description: "Descrição do projeto.",
    tags: ["Docker", "Kubernetes"],
    url: "#",
  },
  {
    title: "Projeto 9",
    description: "Descrição do projeto.",
    tags: ["Next.js", "TypeScript"],
    url: "#",
  },
];
