"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNotificacoes } from "../hooks/useNotificacoes";

export function Topbar() {
  const router = useRouter();
  const { data } = useNotificacoes();
  const unread = data?.filter((item) => !item.lida).length ?? 0;

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
      <div>
        <p className="text-sm text-slate-500">Usuário interno</p>
        <p className="text-base font-semibold text-slate-900">Gestora ACL</p>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/alertas"
          className="relative rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          Alertas
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-semibold text-white">
              {unread}
            </span>
          )}
        </Link>
        <button
          onClick={logout}
          className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
