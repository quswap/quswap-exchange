/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react'
import QuswapLogo from './quswap_img_replacement.png'
import OrderList from './components/OrderList'
import React, { useContext, useState } from 'react';
import { QuPeer } from 'quswap-protocol';
import { getSignerAndInitialize } from './helpers/ProviderSigner';
import { QuPeerContext } from './contexts/QuPeerContext';

export default function App() {
  const [quPeer, setQuPeer] = useState(null)
  const [ bondedQu, setBondedQu ] = useState(0)

  const initializeQuPeer = () => {
    (async () => {
      const signer = await getSignerAndInitialize();
      setQuPeer(await QuPeer.fromPassword({
        signer,
        password: await signer.getAddress()
      }));
    })().catch(console.error);
  };

  return (
    <QuPeerContext.Provider value={[quPeer, setQuPeer]}>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-16 w-55"
                        src= { QuswapLogo }
                        alt="quswapExchange"
                      />
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-700 hover:bg-indigo-600"
                      onClick= { () => initializeQuPeer() }
                    >
		                { quPeer ? quPeer.peerId.toB58String() : 'Connect to qup2p' }
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center ml-2 px-3 py-2 border-indigo-600/100 bg-sky-700 text-sm leading-4 font-medium rounded-md text-white hover:bg-sky-600"
                      onClick = { () => setBondedQu(bondedQu + 1)}
                    >
                      { bondedQu ? bondedQu + 'QU Bonded | $50000' : 'Bond Qu' }
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center ml-2 px-3 py-2 border-indigo-600/100 bg-gray-700 text-sm leading-4 font-medium rounded-md text-white hover:bg-gray-500"
                    >
                      $US
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Order Book</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <OrderList />
          </div>
        </main>
      </div>
    </QuPeerContext.Provider>
  )
}
