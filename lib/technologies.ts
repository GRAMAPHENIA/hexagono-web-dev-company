import {
  Layout,
  Server,
  Shield,
  Code,
  TestTube2,
  GitCommit,
  Layers,
} from 'lucide-react'

export interface Technology {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  tools?: string[]
}

export const technologies: Technology[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: Layout,
    description: 'Interfaces modernas y de alto rendimiento',
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    name: 'Backend & Base de Datos',
    icon: Server,
    description: 'APIs robustas y escalables',
    tools: ['Node.js', 'Supabase', 'PostgreSQL', 'REST/GraphQL'],
  },
  {
    id: 'auth',
    name: 'Autenticación',
    icon: Shield,
    description: 'Seguridad de primer nivel',
    tools: ['Clerk', 'NextAuth', 'JWT', 'OAuth'],
  },
  {
    id: 'code-quality',
    name: 'Calidad de Código',
    icon: Code,
    description: 'Mantenibilidad y claridad',
    tools: ['Clean Code', 'ESLint', 'Prettier', 'TypeScript'],
  },
  {
    id: 'testing',
    name: 'Testing',
    icon: TestTube2,
    description: 'Código confiable y mantenible',
    tools: ['Jest', 'React Testing Library', 'Cypress', 'Vitest'],
  },
  {
    id: 'architecture',
    name: 'Arquitectura',
    icon: Layers,
    description: 'Estructura clara y escalable',
    tools: ['Arquitectura Modular', 'Patrones de Diseño', 'SOLID', 'Principios DRY'],
  },
  {
    id: 'version-control',
    name: 'Control de Versiones',
    icon: GitCommit,
    description: 'Trabajo en equipo eficiente',
    tools: ['Git', 'GitHub', 'Git Flow', 'Conventional Commits'],
  },
]

export function getTechnologies(): Technology[] {
  return technologies
}

export function getTechnologyById(id: string): Technology | undefined {
  return technologies.find(tech => tech.id === id)
}
