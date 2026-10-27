import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Compass, Briefcase, Globe, Menu, X } from "lucide-react";

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-blue-600"
          >
            <Compass className="h-6 w-6" />
            <span>GoJourn</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-500 transition"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/destinations"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-500 transition"
              }
            >
              Explore Packages
            </NavLink>
            <NavLink
              to="/my-bookings"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-500 transition"
              }
            >
              My Bookings
            </NavLink>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 py-4 px-6 flex flex-col gap-4 shadow-inner">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="font-medium hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              to="/destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="font-medium hover:text-blue-600"
            >
              Explore Packages
            </Link>
            <Link
              to="/my-bookings"
              onClick={() => setMobileMenuOpen(false)}
              className="font-medium hover:text-blue-600"
            >
              My Bookings
            </Link>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
              <Globe className="h-5 w-5 text-blue-500" />{" "}
              <span>GoJourn Travels</span>
            </div>
            <p className="text-sm leading-relaxed">
              Curating premium global travel itineraries. Your dream vacation,
              structured to perfection, handled end-to-end.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/destinations" className="hover:text-white transition">
                Search Packages
              </Link>
              <Link to="/my-bookings" className="hover:text-white transition">
                Manage System Bookings
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Support Ecosystem
            </h4>
            <p className="text-sm">
              24/7 Global Concierge Hotline:{" "}
              <span className="text-white">+1 (800) 555-TRAV</span>
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-800 text-xs text-center">
          &copy; {new Date().getFullYear()} GoJourn App. Formatted natively
          using Tailwind CSS.
        </div>
      </footer>
    </div>
  );
}
