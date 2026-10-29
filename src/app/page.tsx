"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/axios";
import { Category, Service } from "@/types";
import { ServiceCard } from "@/components/ServiceCard";
import { Spinner } from "@/components/Spinner";
import { Search, ShieldCheck, Clock, Award, ArrowRight, CheckCircle2, Star, UserCheck, CalendarCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, srvRes] = await Promise.all([
          api.get("/categories"),
          api.get("/services"),
        ]);
        setCategories(catRes.data.data);
        setServices(srvRes.data.data.slice(0, 6)); // Top 6 featured services
      } catch (err) {
        console.error("Failed to fetch home data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/services?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/services");
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section with Deep Hero Background */}
      <section className="relative overflow-hidden bg-[url('/hero.png')] bg-cover bg-center text-slate-900 py-32 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="absolute inset-0 bg-white/45 backdrop-blur-[1px]" />
        <div className="relative max-w-4xl mx-auto text-center space-y-8 animate-in fade-in duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-blue-800 text-xs font-bold border border-blue-200/80 shadow-md backdrop-blur-md hover:scale-105 transition-transform cursor-default">
            <ShieldCheck className="w-4 h-4 text-blue-600 animate-pulse" /> Verified & Trusted Professionals
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight drop-shadow-xs">
            Expert Home Services, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-700">
              Delivered to Your Doorstep
            </span>
          </h1>

          <p className="text-lg text-slate-700 font-medium max-w-2xl mx-auto drop-shadow-xs">
            Book reliable electricians, plumbers, cleaners, and beauty experts in seconds. Transparent pricing and guaranteed satisfaction.
          </p>

          {/* Interactive Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex items-center bg-white/95 backdrop-blur-md p-2.5 rounded-full shadow-2xl border-2 border-blue-500/30 hover:border-blue-500/60 transition-all group">
            <div className="flex-1 flex items-center px-4 gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What service do you need today?"
                className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30 text-sm shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>Search Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Stats */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center border-t border-slate-200/80">
            <div className="p-4 rounded-xl hover:bg-white/40 transition-colors">
              <p className="text-3xl font-bold text-slate-900">100%</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider mt-1 font-semibold">Verified Experts</p>
            </div>
            <div className="p-4 rounded-xl hover:bg-white/40 transition-colors">
              <p className="text-3xl font-bold text-slate-900">4.9/5</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider mt-1 font-semibold">Customer Rating</p>
            </div>
            <div className="col-span-2 sm:col-span-1 p-4 rounded-xl hover:bg-white/40 transition-colors">
              <p className="text-3xl font-bold text-slate-900">Fast</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider mt-1 font-semibold">Instant Booking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-6 bg-blue-600 rounded-full shadow-sm shadow-blue-500/50" />
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Explore Categories</h2>
            </div>
            <p className="text-slate-600 text-sm mt-1 ml-4.5">Find professional services tailored to your needs</p>
          </div>
          <Link href="/services" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12"><Spinner /></div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/services?category=${cat.id}`}
                className="group p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-400 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-3 flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {cat.icon || "🛠️"}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-6 bg-indigo-600 rounded-full shadow-sm shadow-indigo-500/50" />
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Featured Services</h2>
            </div>
            <p className="text-slate-600 text-sm mt-1 ml-4.5">Popular services booked by our customers</p>
          </div>
          <Link href="/services" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
            Browse All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12"><Spinner /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>

      {/* EXTRA SECTION 1: How It Works */}
      <section className="bg-gradient-to-b from-blue-50/20 via-slate-50/50 to-white py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">How QuickServe Works</h2>
            <p className="text-slate-600 text-sm">Getting home services has never been this effortless.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 space-y-4 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md shadow-blue-500/10">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900">Search & Choose</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Browse through our wide range of professional categories and select the exact service you need.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 space-y-4 group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-md shadow-indigo-500/10">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">Book Instantly</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pick your preferred date and time, add notes, and confirm your appointment with transparent pricing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 space-y-4 group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-md shadow-emerald-500/10">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">Relax & Enjoy</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our verified professional arrives at your doorstep on time to deliver top-tier service quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Why Choose QuickServe?</h2>
            <p className="text-slate-400">We make home maintenance and personal care effortless, secure, and professional.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-blue-500/50 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Verified Professionals</h3>
              <p className="text-sm text-slate-400">All service providers undergo strict background checks and skill verification.</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-emerald-500/50 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Instant & Flexible Booking</h3>
              <p className="text-sm text-slate-400">Schedule services at your preferred date and time with zero hassle.</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-purple-500/50 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Satisfaction Guarantee</h3>
              <p className="text-sm text-slate-400">Top-tier service quality with dedicated customer support every step of the way.</p>
            </div>
          </div>
        </div>
      </section>

      {/* EXTRA SECTION 2: Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Customer Feedback
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Loved by Thousands of Homeowners</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-slate-600 text-sm italic">
              "Quick connection with an expert electrician! The pipe leak was repaired in less than 30 minutes. Super professional!"
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                TA
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">Tanvir Ahmed</p>
                <p className="text-xs text-slate-500">Verified Customer</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-slate-600 text-sm italic">
              "The deep cleaning service for my kitchen and bathroom was immaculate. Highly courteous staff and transparent pricing."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm">
                NJ
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">Nusrat Jahan</p>
                <p className="text-xs text-slate-500">Verified Customer</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-slate-600 text-sm italic">
              "Booking an AC servicing technician was seamless. The cooling efficiency improved dramatically. 10/10 service!"
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                RH
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">Rahim Hossain</p>
                <p className="text-xs text-slate-500">Verified Customer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXTRA SECTION 3: Provider CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-br from-blue-50/90 via-indigo-50/40 to-slate-50 border border-blue-100/80 rounded-3xl p-8 sm:p-12 text-slate-900 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.06),transparent_50%)]" />
          <div className="relative z-10 space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Grow Your Business
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Are You a Skilled Professional?</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Join QuickServe as a service provider, connect with thousands of local customers, and grow your income effortlessly.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <span>Join as Provider</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
