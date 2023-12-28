import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo.png";
function UserNavbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const userOptionButton = () => {
    setIsOptionOpen(!isOptionOpen);
  };

  const signOut = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className={`block h-6 w-6 ${
                  isMobileMenuOpen ? "hidden" : "block"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`hidden h-6 w-6 ${
                  isMobileMenuOpen ? "block" : "hidden"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-12 w-auto" src={logo} alt="Your Company" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className={`${
                    location.pathname === "/"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } rounded-md px-3 py-2 text-sm font-medium`}
                  aria-current={location.pathname === "/" ? "page" : undefined}
                >
                  Home
                </Link>
                <Link
                  to="/user/about"
                  className={`${
                    location.pathname === "/user/about"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } rounded-md px-3 py-2 text-sm font-medium`}
                  aria-current={
                    location.pathname === "/user/about" ? "page" : undefined
                  }
                >
                  About
                </Link>
                {/* <Link
                  to="/user/chat"
                  className={`${
                    location.pathname === "/user/chat"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } rounded-md px-3 py-2 text-sm font-medium`}
                  aria-current={
                    location.pathname === "/user/chat" ? "page" : undefined
                  }
                >
                  Chat
                </Link> */}
                <Link
                  to="/user/conferencehalls"
                  className={`${
                    location.pathname === "/user/conferencehalls"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } rounded-md px-3 py-2 text-sm font-medium`}
                  aria-current={
                    location.pathname === "/user/conferencehalls" ? "page" : undefined
                  }
                >
                  Conference Halls
                </Link>
                <Link
                  to="/user/coworkspaces"
                  className={`${
                    location.pathname === "/user/coworkspaces"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } rounded-md px-3 py-2 text-sm font-medium`}
                  aria-current={
                    location.pathname === "/user/coworkspaces" ? "page" : undefined
                  }
                >
                  Co-Working Space
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button> */}

            {localStorage.getItem("token") ? (
              <div className="relative ml-3">
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={userOptionButton}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://as2.ftcdn.net/v2/jpg/05/49/98/39/1000_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                    alt=""
                  />
                </button>

                {isOptionOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      to="/user/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                    >
                      Dashboard
                    </Link>

                    <button
                      className="block px-4 py-2 text-sm text-gray-700"
                      onClick={signOut}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="user/login">
                  <button className="text-white">Login</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        className={`sm:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            to="/"
            className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >
            Home
          </Link>
          <Link
            to="/user/about"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            About
          </Link>
          {/* <Link
            to="/user/chat"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Chat
          </Link> */}
          <Link
            to="/user/conferencehalls"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Conference Halls
          </Link>
          <Link
            to="/user/coworkspaces"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Co-Working Space
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
