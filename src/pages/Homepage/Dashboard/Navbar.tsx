import logo from "../../../assets/logo/logo.png";
import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import ThemeList from "../../../components/ThemeList.tsx";
import { UserContext } from "../../../context/user/user.tsx";
import { User } from "../../../types/auth.ts";
import { logoutUser } from "../../../utils/FetchRequest.ts";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function profileOptions(user: User | null) {
  if (user && user.email) {
    return (
      <Menu.Items className="absolute text-center right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <a
              href="/account"
              className={classNames(
                active ? "bg-gray-100" : "",
                "block px-4 py-2 text-sm text-gray-700",
              )}
            >
              <span className="mr-2 font-bold" aria-hidden="true">
                {user.name}
              </span>
              <br />
              Profile
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={logoutUser}
              className={classNames(
                active ? "bg-gray-100" : "",
                "block px-4 py-2 w-full text-sm text-gray-700",
              )}
            >
              Sign out
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    );
  } else {
    return (
      <Menu.Items className="absolute text-center right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <a
              href="/"
              className={classNames(
                active ? "bg-gray-100" : "",
                "block px-4 py-2 text-sm text-gray-700",
              )}
            >
              Homepage
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              href="/login"
              className={classNames(
                active ? "bg-gray-100" : "",
                "block px-4 py-2 text-sm text-gray-700",
              )}
            >
              Login
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              href="/signup"
              className={classNames(
                active ? "bg-gray-100" : "",
                "block px-4 py-2 text-sm text-gray-700",
              )}
            >
              Sign Up
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    );
  }
}

export default function Navbar() {
  const userData = useContext(UserContext);
  return (
    <Disclosure as="nav" className="bg-gray-800 ">
      {() => (
        <>
          <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-shrink-0 items-center">
                <img className="h-auto w-12" src={logo} alt="Sport Up Logo" />
                <h1 className="text-white font-bold text-2xl">Sport Up</h1>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <h1 className=" text-white mx-2 font-bold text-2xl">Theme</h1>
                <ThemeList />
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-10 h-10 rounded-lg text-gray-300"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                          clipRule="evenodd"
                        />
                      </svg>
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
                    {profileOptions(userData.currentUser)}
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
