import type { CSSProperties } from 'react'

/** Delay and landing twist for the sticker entrance (.pop in index.css) */
export const popStyle = (delay: number, twist: number) => ({ '--d': `${delay}s`, '--r': `${twist}deg` }) as CSSProperties
