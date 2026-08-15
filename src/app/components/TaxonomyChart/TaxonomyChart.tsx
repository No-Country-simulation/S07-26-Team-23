'use client';

import React, { useState } from 'react';
import { TAXONOMY_DATA, TaxonomyNode } from '../../data/taxonomy';

export const TaxonomyChart: React.FC = () => {
  // Estado inicial: primer elemento de los datos (Idle Megawatts)
  const [selectedNode, setSelectedNode] = useState<TaxonomyNode>(TAXONOMY_DATA[0]);

  return (
    <div className="w-full my-8 p-6 rounded-xl border border-neutral-800 bg-[#111] text-neutral-100">
      <h3 className="text-xl font-serif font-bold text-[#E5F95C] mb-2">
        Taxonomía de Capacidad no Utilizada
      </h3>
      <p className="text-sm opacity-80 mb-6">
        Selecciona una de las capas para inspeccionar los componentes de la arquitectura.
      </p>

      {/* Grid de Capas / Botones Interactivos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {TAXONOMY_DATA.map((node: TaxonomyNode) => {
          const isActive = selectedNode.id === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-4 rounded-lg border text-left transition-all cursor-pointer ${
                isActive
                  ? 'border-[#E5F95C] bg-[#E5F95C]/10 font-medium'
                  : 'border-neutral-800 hover:border-[#E5F95C]/50'
              }`}
            >
              <span className="text-xs font-mono uppercase tracking-wider block opacity-60 mb-1">
                Capas: {node.layer}
              </span>
              <span className="font-bold text-base block">{node.title}</span>
            </button>
          );
        })}
      </div>

      {/* Panel de detalle interactivo y condicional */}
      <div className="p-5 rounded-lg border border-neutral-800 bg-neutral-900/50">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-lg font-bold text-[#E5F95C]">
            {selectedNode.title}
          </h4>
          {selectedNode.metrics && (
            <span className="text-xs font-mono px-2 py-1 rounded bg-[#E5F95C]/20 text-[#E5F95C]">
              {selectedNode.metrics.label}: {selectedNode.metrics.value}
            </span>
          )}
        </div>
        <p className="text-sm font-medium mb-2 opacity-90">{selectedNode.subtitle}</p>
        <p className="text-sm opacity-70 leading-relaxed">{selectedNode.description}</p>
      </div>
    </div>
  );
};

export default TaxonomyChart;