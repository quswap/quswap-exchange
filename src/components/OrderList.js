import { ChevronDownIcon } from '@heroicons/react/solid'
import OrderFilters from './OrderFilters'

/* This example requires Tailwind CSS v2.0+ */
const listings = [
  {
    id: 1,
    offering: 'XRP,TRX,NFT',
    wanting: 'BTC,ETH',
    offerValue: 3499905,
    wantValue: 3500000,
    upside: .001,
  },
  {
    id: 1,
    offering: 'XRP,TRX,NFT',
    wanting: 'BTC,ETH',
    offerValue: 3499905,
    wantValue: 3500000,
    upside: -.001,
  },
  {
    id: 1,
    offering: 'XRP,TRX,NFT',
    wanting: 'BTC,ETH',
    offerValue: 3499905,
    wantValue: 3500000,
    upside: -.001,
  },
  {
    id: 1,
    offering: 'XRP,TRX,NFT',
    wanting: 'BTC,ETH',
    offerValue: 3499905,
    wantValue: 3500000,
    upside: .001,
  },
  // More transactions...
]

export default function OrderList() {
  return (
    <div className="p-8 sm:px-6 lg:px-8 border-2 border-gray-200 p-4 bg-gray-200 rounded-md">
      <OrderFilters />
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
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{listing.upside}</td>
                      <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          View Detail
                        </a>
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
