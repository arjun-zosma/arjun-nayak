import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arjun Nayak — Software Engineer',
  description:
    'Personal website of Arjun Nayak, a software engineer building modern web applications with Next.js, TypeScript, and Tailwind CSS.',
  openGraph: {
    title: 'Arjun Nayak — Software Engineer',
    description:
      'Personal website of Arjun Nayak, a software engineer building modern web applications.',
  },
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-20">
      <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:gap-12">
        {/* Bio text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Hi, I&apos;m{' '}
            <span className="text-blue-600">Arjun Nayak</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Software engineer passionate about building fast, accessible, and
            delightful web experiences. I work with modern technologies like
            Next.js, TypeScript, and Tailwind CSS to create products that make
            a difference.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              View My Projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Profile photo */}
        <div className="shrink-0">
          <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-xl sm:h-56 sm:w-56">
            <Image
              src="/images/profile.jpg"
              alt="Profile photo of Arjun Nayak"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 192px, 224px"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
