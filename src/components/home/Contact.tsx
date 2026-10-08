import { useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import SectionHead from '../SectionHead'
import { Reveal, Rv } from '../Reveal'
import { InlineLogo } from '../Logo'
import { site } from '../../data/site'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const details = [
  { label: 'Response time', text: 'Within 12–24 hours' },
  { label: 'Availability', text: 'Work globally' },
]

const field =
  'w-full border border-ink/30 bg-transparent px-4 py-3 text-[14px] placeholder:text-ink/45 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent md:text-[15px]'

/**
 * 06 · Contact: the quiet closing section. A compact message form (sent
 * through Formspree) and the details as a short list.
 */
export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="page-px bg-paper pt-20 pb-10 md:pt-28">
      <SectionHead title="Contact" n={6} />

      <Reveal amount={0.15} className="mt-10 md:mt-14">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-8">
          {/* Form */}
          <div className="md:col-span-6">
            <Rv i={0} as="h2" className="headline text-[10vw] md:text-[min(4.4vw,68px)]">
              Let’s work <em className="text-accent">together.</em>
            </Rv>
            <Rv i={1} as="p" className="mt-4 text-[15px] leading-relaxed text-ink/80 md:text-[17px]">
              Reach out with a brief description of the work.
            </Rv>

            <Rv i={2} className="mt-8">
              <form className="grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
                <label className="sr-only" htmlFor="contact-name">
                  Your name
                </label>
                <input id="contact-name" name="name" required autoComplete="name" placeholder="Your name" className={field} />
                <label className="sr-only" htmlFor="contact-email">
                  Your email
                </label>
                <input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="Your email" className={field} />
                <label className="sr-only" htmlFor="contact-message">
                  Your message
                </label>
                <textarea id="contact-message" name="message" required rows={4} placeholder="Your message" className={`${field} resize-y sm:col-span-2`} />
                <input type="hidden" name="_subject" value="New message from your portfolio" />

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    data-cursor="SEND"
                    className="label inline-flex items-center gap-1.5 rounded-full border border-ink px-5 py-2.5 transition-colors hover:bg-night hover:text-paper disabled:opacity-50"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight size={12} aria-hidden />
                  </button>
                  <p role="status" aria-live="polite" className="text-[14px]">
                    {status === 'sent' && <span>Thank you! I’ll reply within 12–24 hours.</span>}
                    {status === 'error' && (
                      <span className="text-accent">
                        Something went wrong. Please email me at{' '}
                        <a href={`mailto:${site.email}`} className="underline">
                          {site.email}
                        </a>
                        .
                      </span>
                    )}
                  </p>
                </div>
              </form>
            </Rv>
          </div>

          {/* Details: a short list, like the notes on the About page */}
          <Rv i={3} className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="label text-accent">Details</p>
            <dl className="mt-3 border-t border-ink/15">
              {details.map((d) => (
                <div key={d.label} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-x-4 border-b border-ink/15 py-3">
                  <dt className="label text-ink/55">{d.label}</dt>
                  <dd className="text-[15px]">{d.text}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[7.5rem_1fr] items-baseline gap-x-4 border-b border-ink/15 py-3">
                <dt className="label text-ink/55">Email</dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    data-cursor="MAIL"
                    className="text-[15px] underline decoration-1 underline-offset-4 transition-colors hover:text-accent"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </Rv>
        </div>
      </Reveal>

      {/* Back cover strip */}
      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-5 md:mt-24">
        <p className="label">
          <InlineLogo /> · Vol. 2 · End of issue
        </p>
        <p className="label text-ink/55">
          © {site.year} {site.fullName}
        </p>
      </div>
    </section>
  )
}
