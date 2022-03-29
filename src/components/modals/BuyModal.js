/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline'
import { classNames } from '../../helpers/JoinClassNames'

const phonons = [
  { id: 1, name: '34.5689 BULL' },
  { id: 2, name: '21.6548 XRP / 749.200 TRX' },
  { id: 3, name: '51.2654 XMR / 9936.320 APE' },
  { id: 4, name: '2.368 BTC / 8.975 ETH' },
]

export default function BuyModal(props) {
  const [order, setOrder] = useState({})
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(phonons[3])

  useEffect(() => {
    setOrder(props.selectedOrder)
    setOpen(Object.keys(props.selectedOrder).length !== 0)
  }, [props.modalCount, props.selectedOrder])

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-left sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg text-center leading-6 font-medium text-gray-900">
                    Buy Order
                  </Dialog.Title>
                  <div className="mt-2">
                    <Listbox value={selected} onChange={setSelected}>
                      {({ open }) => (
                        <>
                          <Listbox.Label className="block text-sm font-medium text-gray-700">Phonon To Use For Payment:</Listbox.Label>
                            <div className="mt-1 relative">
                              <Listbox.Button className="bg-white cursor-pointer relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span className="block truncate">{selected.name}</span>
                                <span className="absolute pt-2 inset-y-0 right-0 flex items-left pr-2 pointer-events-none">
                                  <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                              </Listbox.Button>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                  {phonons.map((phonon) => (
                                    <Listbox.Option
                                      key={phonon.id}
                                      className={({ active }) =>
                                        classNames(
                                          active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                          'cursor-default select-none cursor-pointer relative py-2 pl-3 pr-9'
                                        )
                                      }
                                      value={phonon}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                            {phonon.name}
                                          </span>

                                          {selected ? (
                                            <span
                                              className={classNames(
                                                active ? 'text-white' : 'text-indigo-600',
                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                              )}
                                            >
                                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                        </>
                      )}
                    </Listbox>
                  </div>
                  <div className="block">
                    <div className="grid grid-cols-2 mt-2 ">
                      <p className="font-bold mr-2"> Payment Phonon Value: </p>
                      <p className=""> $2652 </p>
                    </div>
                    <div className="grid grid-cols-2 mt-2 ">
                      <p className="font-bold mr-2"> Receiving Phonon: </p>
                      <p className=""> 0.2 BTC / 0.3 XMR </p>
                    </div>
                    <div className="grid grid-cols-2 mt-2 ">
                      <p className="font-bold mr-2"> Receiving Phonon Value: </p>
                      <p className=""> ${order.wantValue} </p>
                    </div>
                    <div className="grid grid-cols-2 mt-2 ">
                      <p className="font-bold mr-2"> Upside: </p>
                      <p className="text-green-600"> 0.002% </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Place Buy Order
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
