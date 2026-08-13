import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CitationBlock from '../components/CitationBlock';

describe('CitationBlock Component', () => {
    it('debe renderizar correctamente con las props proporcionadas', () => {
        render(
            <CitationBlock
                author="Autor Ejemplo"
                year="2026"
                title="Título del Reporte"
                url="https://physaflow.com"
            />
        );

        // Verifica que el encabezado principal del bloque esté presente
        expect(screen.getByText(/cómo citar este reporte/i)).toBeInTheDocument();

        // Como el autor aparece en ambos formatos, usamos getAllByText y verificamos que existan los dos
        const authors = screen.getAllByText(/Autor Ejemplo/i);
        expect(authors.length).toBe(2);
    });
});