import type { ContactFormData } from '../types'

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const { Resend } = await import('resend')

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  const contactEmail = process.env.CONTACT_EMAIL || 'hello@arjunnayak.dev'
  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from: 'Contact Form <onboarding@resend.dev>',
    to: [contactEmail],
    subject: `New contact form submission from ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
    replyTo: data.email,
  })

  if (error) {
    throw new Error(error.message || 'Failed to send email')
  }
}
