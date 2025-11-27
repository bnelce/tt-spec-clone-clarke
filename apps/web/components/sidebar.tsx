import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/leads", label: "Leads" },
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/clientes", label: "Clientes" },
  { href: "/ucs", label: "UCs" },
  { href: "/analises", label: "Viabilidade" },
  { href: "/propostas", label: "Propostas" },
  { href: "/contratos", label: "Contratos" },
  { href: "/migracoes", label: "Migrações" },
  { href: "/faturas", label: "Faturas" },
  { href: "/honorarios", label: "Honorários" }
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-200 bg-white">
      <div className="px-6 py-4 text-lg font-semibold">Gestora ACL</div>
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-md px-3 py-2 text-sm ${
                active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
