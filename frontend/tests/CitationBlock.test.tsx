import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CitationBlock from '../components/CitationBlock';

describe('CitationBlock Component', () => {
    it('debe renderizar correctamente con las props proporcionadas', () => {
        render(
            <CitationBlock
                academic="Autor Ejemplo (2026). Título del Reporte. PhysaFlow Stranded Capacity Index. https://physaflow.com"
                journalistic="Autor Ejemplo (2026), &quot;Título del Reporte&quot;, PhysaFlow Stranded Capacity Index, disponible en https://physaflow.com."
            />
        );

        expect(screen.getByText(/formato académico/i)).toBeInTheDocument();
        expect(screen.getByText(/formato periodístico/i)).toBeInTheDocument();
        expect(screen.getByText(/nota de validación/i)).toBeInTheDocument();
        expect(screen.getByText(/atribución de gráficos/i)).toBeInTheDocument();

        const authors = screen.getAllByText(/Autor Ejemplo/i);
        expect(authors.length).toBe(2);
    });
});
