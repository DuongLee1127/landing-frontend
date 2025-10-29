import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/routes/link";

export default function Sidebar() {
  const pathname = usePathname();
  const linkRoute = links;
  return (
    <aside className="w-72 min-h-screen border-r border-gray-100 p-6 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center shadow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 12h18"
              stroke="#2B2B2B"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M3 6h18"
              stroke="#2B2B2B"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M3 18h18"
              stroke="#2B2B2B"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold">DuongLe</div>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="flex flex-col gap-3">
          {linkRoute.map((link, index) => (
            <li key={index}>
              <Link
                className={`flex items-center gap-3 p-3 rounded-lg transition ${
                  link.href == pathname
                    ? "bg-white shadow text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-[#f8f8fa] hover:shadow"
                }`}
                href={link.href}
              >
                <span className="w-9 h-9 bg-white rounded-md flex items-center justify-center shadow-sm">
                  <img className="w-[16px]" src="images/dashboard.png" alt="" />
                </span>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <div className="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-xl shadow-sm">
          <div className="text-sm font-semibold">Need help?</div>
          <div className="text-xs text-gray-500 mt-1">
            Please check our docs
          </div>
          <button className="mt-3 w-full py-2 text-sm bg-white rounded-md shadow font-medium">
            DOCUMENTATION
          </button>
        </div>
      </div>
    </aside>
  );
}
