import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  }

  return (
    <Disclosure as="nav" className="bg-black shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0">
                  <a
                    href="/home"
                    className="text-white text-3xl font-bold tracking-wide"
                  >
                    WanderStay
                  </a>
                </div>
              </div>

              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {user ? (
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="flex items-center text-sm font-medium text-white hover:bg-gray-700 hover:text-gray-200 px-4 py-2 rounded-md transition duration-300">
                            <i className="fa-solid fa-user mr-2"></i>
                            {user.name}
                            <ChevronDownIcon
                              className="ml-1 h-5 w-5 text-gray-300"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="/profile"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    Your Profile
                                  </a>
                                )}
                              </Menu.Item>
                              {user.isAdmin && (
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="/admin"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      Admin
                                    </a>
                                  )}
                                </Menu.Item>
                              )}
                            </div>
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    onClick={logout}
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm cursor-pointer"
                                    )}
                                  >
                                    Logout
                                  </div>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </motion.div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <a
                        href="/login"
                        className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-gray-200 transition duration-300"
                      >
                        Login
                      </a>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {user ? (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <a
                    href="/profile"
                    className="block rounded-md text-base font-medium text-white px-3 py-2 hover:bg-gray-700 hover:text-gray-200 transition duration-300"
                  >
                    Your Profile
                  </a>
                </motion.div>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <a
                    href="/login"
                    className="block rounded-md text-base font-medium text-white px-3 py-2 hover:bg-gray-700 hover:text-gray-200 transition duration-300"
                  >
                    Login
                  </a>
                </motion.div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
