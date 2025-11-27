"use client";

import { useRouter } from "next/navigation";

export function Topbar() {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px 6 px-6 py-3">
      <div>
        <p className="text-sm text-slate-500">Usuário interno</p>
        <p className="text-base font-semibold text-slate-900">Gestora ACL</p>
      </div>
      <button
        onClick={logout}
        className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
      >
        Sair
      </button>
    </header>
  );
}
