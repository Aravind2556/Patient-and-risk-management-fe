'use client'

import { useContext, useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
// import Logo from '../../assets/Logo.png'
import { DContext } from '../../context/Datacontext'

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const {isAuth, currentUser , handleLogout} = useContext(DContext)

  return (
    <header className="bg-white w-100">
      <nav aria-label="Global" className="w-100 flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Patient Monitoring <sup>by ML</sup></span>
            <h1 className='font-bold text-primary-400  text-md lg:text-lg'>Patient Monitoring <sup>by ML</sup></h1>
            {/* <img
              alt="App Logo"
              src={Logo}
              className="h-[80px] w-auto"
            /> */}
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">

          <a href="/" className="text-sm/6 font-semibold text-gray-900">
            Dashboard
          </a>
          {(isAuth && currentUser?.role === 'admin') && <a href="/createPatient" className="text-sm/6 font-semibold text-gray-900">
            Create Patients
          </a>}
          {(isAuth && currentUser?.role === 'admin') && <a href="/bulk-update-patient" className="text-sm/6 font-semibold text-gray-900">
            Bulk Update Patients
          </a>}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {
          isAuth?<button className='rounded-full px-4 py-1 text-md bg-primary-500 hover:bg-primary-600 text-white' onClick={handleLogout}>Logout</button>
          :<button className='rounded-full px-4 py-1 text-md bg-primary-500 hover:bg-primary-600 text-white' onClick={()=>window.location.href="/login"} >Login</button>
          }
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Patient Monitoring <sup>by ML</sup></span>
              <h1 className='font-bold text-primary-400 text-md lg:text-lg'>Patient Monitoring <sup>by ML</sup></h1>
              {/* <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              /> */}
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Dashboard
                </a>
                {(isAuth && currentUser?.role === 'admin') && 
                <a
                  href="/createPatient"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Create Patient
                </a>}
                {(isAuth && currentUser?.role === 'admin') && 
                <a
                  href="/bulk-update-patient"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Bulk Update Patients
                </a>}
              </div>
              <div className="py-6">
                {
                    isAuth?<button className='rounded-full px-4 py-1 text-md bg-primary-500 hover:bg-primary-600 text-white' onClick={handleLogout}>Logout</button>
                    :<button className='rounded-full px-4 py-1 text-md bg-primary-500 hover:bg-primary-600 text-white' onClick={()=>window.location.href="/login"} >Login</button>
                }
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}