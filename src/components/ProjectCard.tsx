import type { Project } from '../types'

interface ProjectCardProps {
  project: Project
}

const techColors: Record<string, string> = {
  'next.js': 'bg-blue-100 text-blue-800',
  'nextjs': 'bg-blue-100 text-blue-800',
  'typescript': 'bg-indigo-100 text-indigo-800',
  'react': 'bg-cyan-100 text-cyan-800',
  'node.js': 'bg-green-100 text-green-800',
  'tailwind css': 'bg-teal-100 text-teal-800',
  'postgresql': 'bg-purple-100 text-purple-800',
  'stripe': 'bg-pink-100 text-pink-800',
}

function getTechBadgeColor(tech: string): string {
  const key = tech.toLowerCase()
  return techColors[key] || 'bg-gray-100 text-gray-800'
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
      <p className="mt-2 text-gray-600">{project.description}</p>

      {/* Tech stack badges */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getTechBadgeColor(tech)}`}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="mt-4 flex items-center gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Source
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Live Demo
          </a>
        )}
      </div>
    </div>
  )
}
