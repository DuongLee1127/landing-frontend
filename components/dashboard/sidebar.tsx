import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/routes/link";

export default function Sidebar() {
  const pathname = usePathname();
  const linkRoute = links;
  let activePath = pathname.split("/")[2];
  if (!activePath) {
    activePath = "dashboard";
  }

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
                  link.active == activePath
                    ? "bg-white shadow font-bold"
                    : "text-gray-600 hover:bg-[#f8f8fa] hover:shadow"
                }`}
                href={link.href}
              >
                <span className="w-5 h-5 rounded-md flex items-center justify-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z" />
                  </svg>
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
