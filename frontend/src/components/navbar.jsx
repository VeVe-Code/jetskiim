import { useClerk, UserButton } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Navbar() {
  const { openSignIn } = useClerk();
  const location = useLocation();

  // APP CONTEXT
  let { user, navigate, isOwner, setshowjetskii } = useAppContext();

  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Topbar scroll logic
  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const BookIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 inline-block mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full py-4 px-4 sm:px-10 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logos */}
        <Link to="/">
          <img
            src="https://readymadeui.com/readymadeui.svg"
            className="w-36 max-sm:hidden"
          />
        </Link>

        <Link to="/">
          <img
            src="https://readymadeui.com/readymadeui-short.svg"
            className="w-10 sm:hidden"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6">
          <li>
            <Link to="/" className="text-[15px] font-medium hover:text-blue-700">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/allservices"
              className="text-[15px] font-medium hover:text-blue-700"
            >
              Our Services
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-[15px] font-medium hover:text-blue-700"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-[15px] font-medium hover:text-blue-700"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          {/* User Menu */}
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Booking"
                  labelIcon={BookIcon}
                  onClick={() => navigate("/my-booking")}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className="px-4 py-2 text-sm rounded-full border border-gray-400 text-slate-900 hover:bg-gray-50"
            >
              Login
            </button>
          )}

          {/* Sign up */}
          <button className="px-4 py-2 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700">
            Sign up
          </button>

          {/* Owner Dashboard / List Jet */}
          {user && (
            <button
              onClick={() =>
                isOwner ? navigate("/owner") : setshowjetskii(true)
              }
              className="px-4 py-2 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700"
            >
              {isOwner ? "Dashboard" : "List Your JetSKii"}
            </button>
          )}

          {/* Mobile menu toggle */}
          <button className="lg:hidden" onClick={() => setOpen(true)}>
            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="fixed top-0 left-0 w-2/3 max-w-[320px] h-full bg-white shadow-lg p-6 z-50 lg:hidden">
          <button
            className="absolute top-4 right-4"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <ul className="mt-10 space-y-4">
            <li className="border-b pb-2">
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            <li className="border-b pb-2">
              <Link to="/allservices" onClick={() => setOpen(false)}>
                Our Services
              </Link>
            </li>
            <li className="border-b pb-2">
              <Link to="/about" onClick={() => setOpen(false)}>
                About
              </Link>
            </li>
            <li className="border-b pb-2">
              <Link to="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
