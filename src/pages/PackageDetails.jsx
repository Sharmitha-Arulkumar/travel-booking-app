import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Users,
  Star,
  ArrowLeft,
} from "lucide-react";
import { packages } from "../data/mockData";

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pkg = packages.find((p) => p.id === id);

  if (!pkg) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <h2 className="text-2xl font-bold">Package Out of Bounds</h2>
        <button
          onClick={() => navigate("/destinations")}
          className="text-blue-600 inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </button>
      </div>
    );
  }

  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    startDate: "",
    travelers: 1,
  });
  const [errors, setErrors] = React.useState({});

  const pricePerTraveler = pkg.price;
  const totalPrice = pricePerTraveler * formData.travelers;

  const validate = () => {
    const tempErrors = {};
    if (!formData.fullName.trim())
      tempErrors.fullName = "Full primary name is required";
    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
      tempErrors.email = "Provide a valid layout email";
    if (!formData.startDate)
      tempErrors.startDate = "Select a valid departure date";
    if (formData.travelers < 1)
      tempErrors.travelers = "Must require at least 1 traveler";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const currentBookings = JSON.parse(
      localStorage.getItem("horizon_bookings") || "[]",
    );
    const newBookingRecord = {
      id: `bk-${Date.now()}`,
      packageId: pkg.id,
      packageTitle: pkg.title,
      image: pkg.image,
      duration: pkg.duration,
      totalPaid: totalPrice,
      ...formData,
    };

    localStorage.setItem(
      "horizon_bookings",
      JSON.stringify([...currentBookings, newBookingRecord]),
    );
    navigate("/my-bookings");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Packages
        </button>
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-80 object-cover rounded-xl shadow-xs"
        />
        <div className="space-y-4">
          <span className="inline-block bg-blue-100 text-blue-800 font-bold text-xs uppercase px-3 py-1 rounded-full">
            {pkg.type} Focus
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {pkg.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <span className="flex items-center gap-1 font-medium text-amber-500">
              <Star className="h-4 w-4 fill-amber-500" /> {pkg.rating} (
              {pkg.reviews} Reviews)
            </span>
            <span>•</span>
            <span>
              Duration: <strong>{pkg.duration}</strong>
            </span>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Included in the Itinerary Platform
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pkg.inclusion.map((inc, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 text-sm text-slate-700"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span>{inc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-md h-fit sticky top-24 space-y-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Fixed Entry Price
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-slate-900">
              ${pkg.price}
            </span>
            <span className="text-xs text-slate-500">/ per traveler</span>
          </div>
        </div>

        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">
              Full Legal Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-hidden transition"
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="text-xs font-medium text-red-500">
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-hidden transition"
              placeholder="johndoe@agency.com"
            />
            {errors.email && (
              <p className="text-xs font-medium text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-hidden transition"
              />
              {errors.startDate && (
                <p className="text-xs font-medium text-red-500">
                  {errors.startDate}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Travelers
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.travelers}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    travelers: Math.max(1, Number(e.target.value)),
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-hidden transition"
              />
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-6 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">
              Total Calculation
            </span>
            <span className="text-2xl font-black text-blue-600">
              ${totalPrice}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition text-sm tracking-wide mt-2"
          >
            Confirm Secure Booking
          </button>
        </form>

        <div className="flex items-center gap-2 text-xs text-slate-400 justify-center">
          <ShieldCheck className="h-4 w-4 text-slate-400" />
          <span>Local engine encryption via localStorage configuration</span>
        </div>
      </div>
    </div>
  );
}
