"use client";

import AccountMenu from "@/components/dashboard/accounMenu";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <div className="text-xs text-gray-400">Pages /</div>
        <div className="text-sm font-semibold text-gray-800">Dashboard</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="search"
            placeholder="Type here..."
            className="w-64 py-2 pl-3 pr-10 rounded-lg bg-white border border-gray-200 text-sm placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <button className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
            </svg>
          </button>
        </div>
        <AccountMenu />
      </div>
    </header>
  );
}
