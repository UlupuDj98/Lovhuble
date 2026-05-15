import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { memo } from "react";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/account",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  },
  {
    id: "orders",
    label: "I miei ordini",
    href: "/account/ordini",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
  },
  {
    id: "addresses",
    label: "Indirizzi",
    href: "/account/indirizzi",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
  {
    id: "profile",
    label: "Profilo",
    href: "/account/profilo",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  },
  {
    id: "shop",
    label: "Torna allo Shop",
    href: "/",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  },
];

function AccountSidebar() {
  const router = useRouter();
  const { customer, logout } = useAuth();

  const isActive = (href: string) => {
    if (href === "/" || href === "/home") return false;
    if (href === "/account") return router.pathname === "/account";
    return router.pathname?.startsWith(href) || false;
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)] ">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#d4a5a5] flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {customer?.first_name?.[0]?.toUpperCase() || "U"}
              {customer?.last_name?.[0]?.toUpperCase() || ""}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-black truncate">
              {customer?.first_name} {customer?.last_name}
            </h3>
            <p className="text-sm text-stone-500 truncate">{customer?.email}</p>
          </div>
        </div>
      </div>

      <nav className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.25)] ">
        <ul className="divide-y divide-stone-300">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-5 py-4 transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-[#d4a5a5] text-white"
                    : "text-stone-400 hover:bg-stone-50 hover:text-stone-900 border-l-4 border-transparent"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="p-4 border-t border-stone-300">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-black text-white hover:bg-white hover:text-black hover:border hover:border-stone-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Esci</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}

export default memo(AccountSidebar);
