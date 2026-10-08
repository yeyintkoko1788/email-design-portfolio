import { createContext, useContext } from 'react'

/** Lets a page inside the opening story turn to the next page (e.g. a NEXT button). */
export const StoryContext = createContext<{ next: () => void }>({ next: () => {} })

export const useStory = () => useContext(StoryContext)
