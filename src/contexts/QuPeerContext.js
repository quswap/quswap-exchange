// const [quPeer, setQuPeer] = useContext(QuPeerContext)
import { createContext, useEffect, useContext, useState } from 'react'
import { QuPeer } from 'quswap-protocol';
import { getSignerAndInitialize } from '../helpers/ProviderSigner';
import { startAdvertisingRandomOrders } from '../helpers/GenerateRandomAdvertisement';

const QuPeerContext = createContext();

// hook to use the quPeer
export function useQuPeer() {
  return useContext(QuPeerContext);
}

export function QuPeerProvider({ children }) {
  const testMode = process.env.REACT_APP_TESTING;
  const [quPeer, setQuPeer] = useState();
  const [loading, setLoading] = useState(false); // by default we load first

  function initializeQuPeer() {
    (async () => {
      const signer = await getSignerAndInitialize();
      const quPeer = await QuPeer.fromPassword({
        signer,
        password: await signer.getAddress()
      });
      quPeer.on("peer:orderbook", (event)=>{
          console.log("GOT EVENT: ", event)
      })
      if (testMode) {
          console.log("triggering listening...")
          console.log("made it to end")
          startAdvertisingRandomOrders(quPeer);
	      console.log('advertising');
      }
      setQuPeer(quPeer);
    })().catch(console.error);
  };

  // we only want this to run once, hence useEffect

  const value = {
    // we store the current user to use everywhere in the app; we can add more contexts if needed
    testMode,
    quPeer,
    initializeQuPeer
  };
  return (
    <QuPeerContext.Provider value={value}>
      {!loading ? (
        children
      ) : (
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      )}
    </QuPeerContext.Provider>
  );
}

export { QuPeerContext };
