import type { Metadata } from 'next'
import { getAllProjects } from '../../lib/projects'
import ProjectCard from '../../components/ProjectCard'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'AI agent systems, open-source tools, and agentic harnesses built by Arjun Nayak — Founder & CEO of Zosma AI.',
  openGraph: {
    title: 'Projects — Arjun Nayak',
    description:
      'AI agent systems, open-source tools, and agentic harnesses built by Arjun Nayak.',
  },
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Projects</h1>
      <p className="mt-2 text-gray-600">
        AI agent systems, open-source tools, and agentic harnesses I&apos;ve built.
      </p>

      {projects.length === 0 ? (
        <div className="mt-12 rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <p className="text-lg text-gray-500">No projects yet — check back soon!</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
