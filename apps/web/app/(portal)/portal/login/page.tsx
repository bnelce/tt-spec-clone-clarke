"use client";

import { useState } from "react";

export default function PortalLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call /portal/auth/login mutation
    console.log({ email, senha });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">Portal do Cliente</h1>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="text-sm text-slate-700">E-mail</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>
          <div>
            <label className="text-sm text-slate-700">Senha</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              type="password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
