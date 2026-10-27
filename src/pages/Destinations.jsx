import React from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Star, Clock } from "lucide-react";
import { packages } from "../data/mockData";

export default function Destinations() {
  const [search, setSearch] = React.useState("");
  const [filterType, setFilterType] = React.useState("All");
  const [maxPrice, setMaxPrice] = React.useState(2500);

  const filteredPackages = packages.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.destination.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "All" || p.type === filterType;
    const matchesPrice = p.price <= maxPrice;
    return matchesSearch && matchesType && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Explore Scheduled Itineraries
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Refine options using instant functional query parameters.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Destination Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by city, country..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-hidden transition"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Vibe Category
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-hidden transition"
          >
            <option value="All">All Categories</option>
            <option value="Cultural">Cultural Immersions</option>
            <option value="Romantic">Romantic Getaways</option>
            <option value="Adventure">High Adventure</option>
            <option value="Luxury">Premium Luxury</option>
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>Price Ceiling</span>
            <span className="text-blue-600 font-extrabold">${maxPrice}</span>
          </div>
          <input
            type="range"
            min="500"
            max="2500"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPackages.length > 0 ? (
          filteredPackages.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition"
            >
              <div>
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {p.duration}
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 font-medium">
                      <Star className="h-3.5 w-3.5 fill-amber-500" /> {p.rating}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 leading-snug line-clamp-2">
                    {p.title}
                  </h3>
                </div>
              </div>
              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <div>
                  <span className="text-xs text-slate-400 block">From</span>
                  <span className="text-xl font-extrabold text-slate-900">
                    ${p.price}
                  </span>
                </div>
                <Link
                  to={`/package/${p.id}`}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-md transition"
                >
                  Configure Package
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-slate-100 rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500 font-medium">
              No vacation itineraries match your filter combination.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
