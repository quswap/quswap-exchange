import { ChevronDownIcon } from '@heroicons/react/solid'
import OrderFilters from './OrderFilters'
import BuyModal from './modals/BuyModal'
import { useState } from 'react'

/* This example requires Tailwind CSS v2.0+ */
const listings = [
  {
    id: 1,
    offering: 'XRP/TRX/NFT',
    wanting: 'BTC/ETH',
    offerValue: 24466.89,
    wantValue: 24480.72,
    upside: 3.49,
  },
  {
    id: 2,
    offering: 'XRP/TRX/NFT',
    wanting: 'XMR/APE',
    offerValue: 11182.17,
    wantValue: 11180.72,
    upside: -1.24,
  },
  {
    id: 3,
    offering: 'XRP/TRX/NFT',
    wanting: 'ALTS',
    offerValue: 28820.99,
    wantValue: 28819.82,
    upside: -0.04,
  },
  {
    id: 4,
    offering: 'XRP/TRX/NFT',
    wanting: 'BULL/JST',
    offerValue: 4260.65,
    wantValue: 4263.18,
    upside: 2.32,
  },
  {
    id: 5,
    offering: 'XRP/TRX/NFT',
    wanting: 'LTC/ELON',
    offerValue: 2066.96,
    wantValue: 2075.02,
    upside: 6.81,
  },
  {
    id: 6,
    offering: 'XRP/TRX/NFT',
    wanting: 'SAND/USDT',
    offerValue: 38469.52,
    wantValue: 38461.28,
    upside: -3.36,
  },
  {
    id: 7,
    offering: 'XRP/TRX/NFT',
    wanting: 'JPEG',
    offerValue: 35795.12,
    wantValue: 35798.02,
    upside: 2.53,
  },
  {
    id: 8,
    offering: 'XRP/TRX/NFT',
    wanting: 'ZRX',
    offerValue: 17267.95,
    wantValue: 17270.73,
    upside: 3.12,
  },
  {
    id: 9,
    offering: 'XRP/TRX/NFT',
    wanting: 'MANA/HUNT',
    offerValue: 18230.47,
    wantValue: 18222.34,
    upside: -6.57,
  },
  // More transactions...
]

export default function OrderList() {
  const [selectedOrder, setSelectedOrder] = useState({})
  const [modalCount, setModalCount] = useState(0);
  
  return (
    <div className="p-8 sm:px-6 lg:px-8 border-2 border-gray-200 p-4 bg-gray-200 rounded-md">
      <OrderFilters />
      <BuyModal selectedOrder={selectedOrder} modalCount={modalCount}/>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Offering
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Wanting
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Offer Value
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Want Value
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 flex flex-row"
                    >
                      Upside
                      <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {listings.map((listing) => (
                    <tr key={listing.id} className={listing.upside >= 0 ? 'bg-green-100' : 'bg-red-100'}>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{listing.offering}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{listing.wanting}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{listing.offerValue}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{listing.wantValue}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{listing.upside + '%'}</td>
                      <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button 
                          onClick={() => {
                            setSelectedOrder(listing)
                            setModalCount(modalCount + 1)
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
