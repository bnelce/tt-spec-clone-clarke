// Domain types (expand per spec)
export type ID = string;

export interface UsuarioInterno {
  id: ID;
  nome: string;
  email: string;
  papel: "admin" | "diretor" | "comercial" | "analista" | "financeiro";
  status: "ativo" | "inativo";
}

export interface UsuarioCliente {
  id: ID;
  clienteId: ID;
  nome: string;
  email: string;
  status: "ativo" | "inativo";
}
