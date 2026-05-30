import type { Metadata } from 'next'
import ContactForm from '../../components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Arjun Nayak, Founder & CEO of Zosma AI. Send a message using the contact form.',
  openGraph: {
    title: 'Contact — Arjun Nayak',
    description:
      'Get in touch with Arjun Nayak, Founder & CEO of Zosma AI.',
  },
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Get in Touch</h1>
      <p className="mt-2 text-gray-600">
        Have a question, project idea, or just want to say hi? Fill out the form
        below and I&apos;ll get back to you.
      </p>

      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  )
}
