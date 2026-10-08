/** The leaf from the "n" in the logo. Colour comes from CSS (currentColor). */
export default function Leaf({ className = 'text-accent' }: { className?: string }) {
  return (
    <svg viewBox="49.3 63.3 92 92" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <path d="M59.6143 142.867C64.3618 117 72.488 97.4931 94.3258 80.6959C101.842 74.9032 124.142 65.1567 133.13 66.6913C135.473 72.1106 130.279 89.8756 127.879 95.4056C115.576 123.816 93.5295 136.548 65.8507 147.415C63.08 148.5 58.6 150.6 56.6 152.6C57.4 150.2 58.76 147.5 59.6143 142.867Z" />
    </svg>
  )
}
