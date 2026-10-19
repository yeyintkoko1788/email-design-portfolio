export type ProcessStep = { step: string; question: string }

export const process: ProcessStep[] = [
  { step: 'Brief', question: 'What’s the email’s job?' },
  { step: 'Audience', question: 'Who am I talking to?' },
  { step: 'Strategy', question: 'What should they do next?' },
  { step: 'Content', question: 'What actually needs to be said?' },
  { step: 'Design', question: 'How do we make them want to look?' },
  { step: 'Optimize', question: 'Does it work beyond the pretty picture?' },
]
