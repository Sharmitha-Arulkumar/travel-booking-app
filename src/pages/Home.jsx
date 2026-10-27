import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Clock } from "lucide-react";
import { destinations, packages } from "../data/mockData";

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      <section className="relative text-white py-24 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-100 mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1561276949-a494bc3b5b35?q=80&w=1543&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D')] bg-cover bg-center" />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Explore The World, <br />
            One Handcrafted Package At A Time
          </h1>
          <p className="text-lg md:text-xl text-slate-100 max-w-2xl mx-auto">
            Discover premium itineraries with verified bookings, all secured
            locally via standard device operations.
          </p>
          <div className="pt-4">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              Find Next Itinerary <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Featured Curated Destinations
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Top picked regional choices worldwide by our trip directors.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((d) => (
            <div
              key={d.id}
              className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-sm">
                  {d.tag}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-lg text-slate-900">{d.name}</h3>
                <p className="text-sm text-slate-600 line-clamp-3">
                  {d.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Trending Travel Packages
            </h2>
            <p className="text-slate-500">
              All-inclusive arrangements with fixed price calculation models.
            </p>
          </div>
          <Link
            to="/destinations"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-500"
          >
            View Catalog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between"
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
                      <Star className="h-3.5 w-3.5 fill-amber-500" /> {p.rating}{" "}
                      ({p.reviews})
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
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-md transition"
                >
                  View Itinerary
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
