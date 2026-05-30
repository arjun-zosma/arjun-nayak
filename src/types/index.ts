export interface ProjectFrontmatter {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Project extends ProjectFrontmatter {
  slug: string;
}

export interface BlogPostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  published: boolean;
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;
  content: string;
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  published: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
