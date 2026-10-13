export type ProcessStep = { step: string; question: string; detail: string }

export const process: ProcessStep[] = [
  { step: 'Brief', question: 'What’s the email’s job?', detail: 'Campaign goal, offer, context, and role in the bigger journey.' },
  { step: 'Audience', question: 'Who am I talking to?', detail: 'New customer? Existing customer? Someone who almost bought?' },
  { step: 'Strategy', question: 'What should they do next?', detail: 'Offer, message, CTA, timing: one clear action.' },
  { step: 'Content', question: 'What actually needs to be said?', detail: 'Message hierarchy, copy, CTA, product or offer, proof.' },
  { step: 'Design', question: 'How do we make them want to look?', detail: 'Art direction, imagery, typography, color, layout, and motion.' },
  { step: 'Optimize', question: 'Does it work beyond the pretty picture?', detail: 'Mobile, hierarchy, links, clarity. Then refine where it’s not doing its job.' },
]
