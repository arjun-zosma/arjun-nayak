import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Project, ProjectFrontmatter } from '../types'

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects')

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) {
    return []
  }

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.md'))

  return files.map((file) => {
    const filePath = path.join(PROJECTS_DIR, file)
    const source = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(source)
    const frontmatter = data as ProjectFrontmatter
    const slug = file.replace('.md', '')

    return {
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      techStack: frontmatter.techStack || [],
      githubUrl: frontmatter.githubUrl,
      liveUrl: frontmatter.liveUrl,
      featured: frontmatter.featured ?? false,
    }
  })
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured)
}

export function getProjectBySlug(slug: string): Project | null {
  const projects = getAllProjects()
  return projects.find((p) => p.slug === slug) || null
}
