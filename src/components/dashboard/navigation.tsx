import { classNames } from "@/utils/classNames";
import { Routes } from "@/utils/routes";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Avatar from "boring-avatars";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";
import { Button } from "../button";

const navigation = [
  { name: "Dashboard", href: Routes.dashboard.landing },
  { name: "DAO", href: Routes.dashboard.dao.landing },
  { name: "Papers", href: Routes.dashboard.paper.landing },
  { name: "Profile", href: Routes.dashboard.profile.landing },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export function Navigation() {
  const [hasMounted, setHasMounted] = useState(false);
  const { address, connector, isConnected } = useAccount();
  const { chain, chains } = useNetwork();
  const router = useRouter();
  const path = router.asPath.split("?")[0];

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const { disconnect } = useDisconnect();
  // Hooks
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Render
  if (!hasMounted) return null;

  function truncate(
    fullStr,
    strLen = 8,
    separator = "...",
    frontChars = 4,
    backChars = 4
  ) {
    if (fullStr.length <= strLen) return fullStr;

    return (
      fullStr.substr(0, frontChars) +
      separator +
      fullStr.substr(fullStr.length - backChars)
    );
  }

  return (
    <Disclosure as="header" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
            <div className="relative flex justify-between h-16">
              <div className="relative z-10 flex px-2 lg:px-0">
                <div className="flex items-center flex-shrink-0">
                  <Link href={Routes.dashboard.landing}>
                    <img
                      className="block w-auto h-8"
                      src="/labio.png"
                      alt="labio"
                    />
                  </Link>
                </div>
              </div>
              <div className="relative z-0 flex items-center justify-center flex-1 px-2 sm:absolute sm:inset-0">
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MagnifyingGlassIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                {/* Connect Wallet */}
                {!isConnected &&
                  connectors.map((connector) => (
                    <Button
                      disabled={!connector.ready}
                      key={connector.id}
                      onClick={() => connect({ connector })}
                      className="mx-2 rounded-full"
                    >
                      Connect Wallet
                    </Button>
                  ))}
                <div className="flex flex-col text-right">
                  {isConnected && (
                    <div className="text-sm">
                      <p>{truncate(address)}</p>
                    </div>
                  )}
                  {chain && (
                    <div className="text-xs text-gray-600">
                      <p>{chain.name}</p>
                    </div>
                  )}
                </div>
                {/* Profile dropdown */}
                <Menu as="div" className="relative flex-shrink-0 ml-4">
                  <div>
                    <Menu.Button className="flex bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>

                      <Avatar
                        size={34}
                        name="Maria Mitchell"
                        variant="beam"
                        colors={["#9089FC", "#FF80B5"]}
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
                    <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block py-2 px-4 text-sm text-gray-700"
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            <nav
              className="hidden lg:flex lg:space-x-8 lg:py-2"
              aria-label="Global"
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    path === item.href
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                    "rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    path === item.href
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                    "block rounded-md py-2 px-3 text-base font-medium"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Avatar
                    size={36}
                    name="Maria Mitchell"
                    variant="beam"
                    colors={["#9089FC", "#FF80B5"]}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    Albert Einstein
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    albi@einstein.xyz
                  </div>
                </div>
                <button
                  type="button"
                  className="flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>
              <div className="px-2 mt-3 space-y-1">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-500 rounded-md hover:bg-gray-50 hover:text-gray-900"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
