// const [quPeer, setQuPeer] = useContext(QuPeerContext)
import { createContext, useEffect, useContext, useState } from 'react'
import { QuPeer } from 'quswap-protocol';
import { getSignerAndInitialize } from '../helpers/ProviderSigner';
import { startAdvertisingRandomOrders, createQuPeer } from '../helpers/GenerateRandomAdvertisement';

const QuPeerContext = createContext();

// hook to use the quPeer
export function useQuPeer() {
  return useContext(QuPeerContext);
}

export function QuPeerProvider({ children }) {
  const testMode = true;
  const [quPeer, setQuPeer] = useState();
  const [loading, setLoading] = useState(false); // by default we load first

  function initializeQuPeer() {
    (async () => {
      const signer = await getSignerAndInitialize();
      setQuPeer(await QuPeer.fromPassword({
        signer,
        password: await signer.getAddress()
      }));
    })().catch(console.error);
  };

  // we only want this to run once, hence useEffect
  useEffect(() => {
      console.log("trigger useeffect")
    if (quPeer) {
        console.log("triggering listening...")
        quPeer.start();
        quPeer.on("peer:orderbook", (event)=>{
            console.log("GOT EVENT: ", event)
        })
        if (testMode) {
            createQuPeer().then(listener => {
                console.log("Created random listener")
                listener.on("peer:orderbook", (event)=>{
                    console.log("RANDOM LISTENER GOT EVENT: ", event)
                })
            });
            startAdvertisingRandomOrders();
        }
        console.log("made it to end")
    }
  }, [quPeer]);

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