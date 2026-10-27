import React from "react";
import {
  Trash2,
  PlaneTakeoff,
  Calendar,
  Users,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MyBookings() {
  const [bookings, setBookings] = React.useState([]);

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("horizon_bookings") || "[]");
    setBookings(data);
  }, []);

  const cancelReservation = (id) => {
    if (
      !window.confirm("Are you sure you want to drop this travel reservation?")
    )
      return;
    const remaining = bookings.filter((b) => b.id !== id);
    localStorage.setItem("horizon_bookings", JSON.stringify(remaining));
    setBookings(remaining);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Your Local System Bookings
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage active itineraries stored directly inside this browser sandbox
          environment.
        </p>
      </div>

      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col md:flex-row items-stretch justify-between"
            >
              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 flex-grow">
                <img
                  src={b.image}
                  alt={b.packageTitle}
                  className="w-full sm:w-32 h-24 object-cover rounded-lg flex-shrink-0"
                />
                <div className="space-y-2 w-full text-center sm:text-left">
                  <h3 className="font-extrabold text-slate-900 text-lg leading-tight">
                    {b.packageTitle}
                  </h3>
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-1.5 text-xs font-medium text-slate-600 pt-1">
                    <span className="flex items-center gap-1 justify-center sm:justify-start">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />{" "}
                      {b.startDate}
                    </span>
                    <span className="flex items-center gap-1 justify-center sm:justify-start">
                      <Users className="h-3.5 w-3.5 text-slate-400" />{" "}
                      {b.travelers} Traveler(s)
                    </span>
                    <span className="flex items-center gap-1 justify-center sm:justify-start col-span-2 sm:col-span-1">
                      <DollarSign className="h-3.5 w-3.5 text-slate-400" />{" "}
                      Spent: <strong>${b.totalPaid}</strong>
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 pt-1">
                    Passholder:{" "}
                    <span className="text-slate-700 font-semibold">
                      {b.fullName}
                    </span>{" "}
                    ({b.email})
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 md:border-l border-t md:border-t-0 border-slate-200 px-6 py-4 flex md:flex-col items-center justify-between md:justify-center gap-4">
                <div className="text-left md:text-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full block w-fit md:mx-auto">
                    Confirmed
                  </span>
                </div>
                <button
                  onClick={() => cancelReservation(b.id)}
                  className="text-xs font-semibold text-red-600 hover:bg-red-50 p-2 rounded-md transition flex items-center gap-1"
                  title="Cancel Booking"
                >
                  <Trash2 className="h-4 w-4" />{" "}
                  <span className="md:hidden">Cancel</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 space-y-4 max-w-xl mx-auto shadow-xs">
          <PlaneTakeoff className="h-12 w-12 text-slate-300 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-slate-900">
              No Travel Plans Scheduled
            </h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">
              Your browser storage is empty. Explore custom catalog layouts to
              create a booking.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/destinations"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-md shadow-xs transition"
            >
              Browse Packages
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
