import { ChevronDownIcon } from '@heroicons/react/solid'

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
    upside: .001,
  },
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
    upside: .001,
  },
  // More transactions...
]

export default function OrderList() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Search</h1>
          <p className="mt-2 text-sm text-gray-700">
            You can search for pairs by tickers in offering and/or wanting.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Search
          </button>
        </div>
      </div>
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
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Upside
                      <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {listings.map((listing) => (
                    <tr key={listing.id}>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{listing.offering}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{listing.wanting}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{listing.offerValue}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{listing.wantValue}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{listing.upside}</td>
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
