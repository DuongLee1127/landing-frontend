"use client";

import Sidebar from "@/components/dashboard/sidebar";
import Navbar from "@/components/dashboard/navbar";
import { useEffect, useState } from "react";
import { redirect, RedirectType, useRouter } from "next/navigation";
import { NextResponse } from "next/server";

export default function Dashboard() {
  // const [token, setToken] = useState<string | null>(null);
  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   setToken(storedToken);
  // }, []);
  // console.log(token);
  // // if (token === null) router.push("/login");

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-full mx-auto space-y-6">
          <Navbar />
          <div className="grid grid-cols-4 gap-4">
            {[
              { title: "Today's Money", value: "$53,000", change: "+55%" },
              { title: "Today's Users", value: "2,300", change: "+3%" },
              { title: "New Clients", value: "+3,462", change: "-2%" },
              { title: "Sales", value: "$103,430", change: "+5%" },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs text-gray-400">{c.title}</div>
                  <div className="text-xl font-semibold">
                    {c.value}{" "}
                    <span className="text-sm text-green-500">{c.change}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center text-white">
                  ≡
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 -mx-3">
            <div className="w-full px-3 mb-6 lg:mb-0 lg:w-7/12 lg:flex-none">
              <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap -mx-3">
                    <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
                      <div className="flex flex-col h-full">
                        <p className="pt-2 mb-1 font-semibold">
                          Built by developers
                        </p>
                        <h5 className="font-bold">Soft UI Dashboard</h5>
                        <p className="mb-12">
                          From colors, cards, typography to complex elements,
                          you will find the full documentation.
                        </p>
                        <a
                          className="mt-auto mb-0 text-sm font-semibold leading-normal group text-slate-500"
                          href="javascript:;"
                        >
                          Read More
                          <i className="fas fa-arrow-right ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200"></i>
                        </a>
                      </div>
                    </div>
                    <div className="max-w-full px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 lg:flex-none">
                      <div className="h-full bg-gradient-to-tl from-purple-700 to-pink-500 rounded-xl">
                        <img
                          src="images/shapes/waves-white.svg"
                          className="absolute top-0 hidden w-1/2 h-full lg:block"
                          alt="waves"
                        />
                        <div className="relative flex items-center justify-center h-full">
                          <img
                            className="relative z-20 w-full pt-6"
                            src="images/illustrations/rocket-white.png"
                            alt="rocket"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-full px-3 lg:w-5/12 lg:flex-none">
              <div className="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border p-4">
                <div className="relative bg-[url('/images/ivancik.jpg')] h-full overflow-hidden bg-cover rounded-xl">
                  <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-80"></span>
                  <div className="relative z-10 flex flex-col flex-auto h-full p-4">
                    <h5 className="pt-2 mb-6 font-bold text-white">
                      Work with the rockets
                    </h5>
                    <p className="text-white">
                      Wealth creation is an evolutionarily recent positive-sum
                      game. It is all about who take the opportunity first.
                    </p>
                    <a
                      className="mt-auto mb-0 text-sm font-semibold leading-normal text-white group"
                      href="javascript:;"
                    >
                      Read More
                      <i className="fas fa-arrow-right ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* charts row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-white rounded-lg shadow p-6">
              <div className="h-40 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg"></div>
              <div className="mt-4 grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">36K</div>
                  <div className="text-xs text-gray-400">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">2m</div>
                  <div className="text-xs text-gray-400">Clicks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">435$</div>
                  <div className="text-xs text-gray-400">Sales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">43</div>
                  <div className="text-xs text-gray-400">Items</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h5 className="text-sm text-gray-500">Sales overview</h5>
              <div className="h-40 mt-4 bg-gradient-to-br from-pink-50 to-white rounded-lg"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
