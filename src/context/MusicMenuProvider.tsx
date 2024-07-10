import { createContext, ReactNode, useCallback, useState } from 'react'

export interface TMusicMenuContext { open: boolean, toggleOpen: () => void, onClose: () => void }
export const MusicMenuContext = createContext<TMusicMenuContext | undefined>(undefined)

const MusicMenuProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setOpen(current => !current)
    }, [])
    
    const onClose = useCallback(() => {
        setOpen(false)
    }, [])
    return (
        <MusicMenuContext.Provider value={{ open, toggleOpen, onClose }}>
            {children}
        </MusicMenuContext.Provider>
    )
}

export default MusicMenuProvider