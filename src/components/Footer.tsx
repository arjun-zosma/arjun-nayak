import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Arjun Nayak. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="https://github.com/arjunnayak"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            GitHub
          </Link>
          <Link
            href="https://twitter.com/arjunnayak"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            Twitter
          </Link>
          <Link
            href="https://linkedin.com/in/arjunnayak"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  )
}
