import { Layout, Server, Smartphone, Database, Palette, Cpu } from "lucide-react";

export interface Technology {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  tools?: string[];
}

export const technologies: Technology[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: Layout,
    description: 'Interfaces modernas y responsivas',
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: Server,
    description: 'APIs robustas y escalables',
    tools: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'mobile',
    name: 'Mobile',
    icon: Smartphone,
    description: 'Aplicaciones móviles nativas',
    tools: ['React Native', 'Flutter', 'iOS', 'Android'],
  },
  {
    id: 'database',
    name: 'Bases de Datos',
    icon: Database,
    description: 'Gestión eficiente de datos',
    tools: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase'],
  },
  {
    id: 'design',
    name: 'Diseño',
    icon: Palette,
    description: 'Experiencias visuales atractivas',
    tools: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
  },
  {
    id: 'devops',
    name: 'DevOps',
    icon: Cpu,
    description: 'Despliegue y monitoreo',
    tools: ['Docker', 'AWS', 'Vercel', 'GitHub Actions'],
  },
];

export const getTechnologies = (): Technology[] => {
  return technologies;
};

export const getTechnologyById = (id: string): Technology | undefined => {
  return technologies.find(tech => tech.id === id);
};