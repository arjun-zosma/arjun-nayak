import type { Metadata } from 'next'
import { getAllPosts } from '../../lib/blog'
import BlogPostPreview from '../../components/BlogPostPreview'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read articles by Arjun Nayak on software engineering, web development, and technology.',
  openGraph: {
    title: 'Blog — Arjun Nayak',
    description:
      'Read articles by Arjun Nayak on software engineering and web development.',
  },
}

export const revalidate = 3600

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Blog</h1>
      <p className="mt-2 text-gray-600">
        Thoughts on software engineering, web development, and technology.
      </p>

      {posts.length === 0 ? (
        <div className="mt-12 rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <p className="text-lg text-gray-500">No posts yet. Coming soon!</p>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {posts.map((post) => (
            <BlogPostPreview key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
