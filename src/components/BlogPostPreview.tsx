import Link from 'next/link'
import type { BlogPostSummary } from '../types'

interface BlogPostPreviewProps {
  post: BlogPostSummary
}

export default function BlogPostPreview({ post }: BlogPostPreviewProps) {
  return (
    <article className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {post.tags.length > 0 && (
          <span className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
              >
                {tag}
              </span>
            ))}
          </span>
        )}
      </div>
      <Link href={`/blog/${post.slug}`}>
        <h2 className="mt-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
          {post.title}
        </h2>
      </Link>
      <p className="mt-2 text-gray-600">{post.excerpt}</p>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
      >
        Read more
        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </Link>
    </article>
  )
}
