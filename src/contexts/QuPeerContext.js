// const [quPeer, setQuPeer] = useContext(QuPeerContext)
import { createContext } from 'react'

const QuPeerContext = createContext()
QuPeerContext.displayName = "QuPeerContext"

export { QuPeerContext };