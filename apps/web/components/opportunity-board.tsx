"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  useDraggable,
  useDroppable
} from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Oportunidade } from "../hooks/useOportunidades";
import type { OportunidadeEtapa } from "../hooks/useOportunidadeEtapas";

interface Props {
  oportunidades: Oportunidade[];
  etapas: OportunidadeEtapa[];
}

export function OpportunityBoard({ oportunidades, etapas }: Props) {
  const queryClient = useQueryClient();
  const [activeId, setActiveId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: ({ id, etapaId }: { id: string; etapaId: string }) =>
      api.patch(`/oportunidades/${id}/etapa`, { etapaId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["oportunidades"] })
  });

  const columns = useMemo(() => {
    return etapas
      .slice()
      .sort((a, b) => a.ordem - b.ordem)
      .map((etapa) => ({
        etapa,
        cards: oportunidades.filter((opp) => opp.etapa.id === etapa.id)
      }));
  }, [etapas, oportunidades]);

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active?.id) {
      setActiveId(event.active.id as string);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (over && over.id !== undefined && active?.id && over.id !== active.data?.current?.etapaId) {
      mutation.mutate({ id: active.id as string, etapaId: over.id as string });
    }
    setActiveId(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {columns.map(({ etapa, cards }) => (
          <Column key={etapa.id} etapaId={etapa.id} title={etapa.nome} count={cards.length}>
            {cards.map((card) => (
              <Card key={card.id} card={card} isDragging={activeId === card.id} />
            ))}
            {cards.length === 0 && (
              <p className="text-sm text-slate-400">Nenhuma oportunidade nesta etapa.</p>
            )}
          </Column>
        ))}
      </div>
    </DndContext>
  );
}

interface ColumnProps {
  etapaId: string;
  title: string;
  count: number;
  children: React.ReactNode;
}

function Column({ etapaId, title, count, children }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: etapaId });
  return (
    <div ref={setNodeRef} className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <span className="text-xs text-slate-500">{count}</span>
      </div>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

interface CardProps {
  card: Oportunidade;
  isDragging: boolean;
}

function Card({ card, isDragging }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging: dragging } = useDraggable({
    id: card.id,
    data: { etapaId: card.etapa.id }
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded-lg border border-slate-200 p-3 shadow-sm transition ${
        dragging || isDragging ? "opacity-60" : "bg-white"
      }`}
    >
      <p className="text-sm font-medium text-slate-900">
        {card.cliente?.nomeFantasia ?? card.lead?.nomeFantasia ?? "Sem empresa"}
      </p>
      <p className="text-xs text-slate-500">
        Valor potencial: {card.valorPotencial ? `R$ ${card.valorPotencial.toLocaleString()}` : "—"}
      </p>
    </div>
  );
}
