import fs from 'fs';
import path from 'path';
import { TaxonomyLayer, MethodologyData, CitationsData } from './types';

// Ruta absoluta hacia backend/data (fuente única de verdad, compartida con
// el pipeline de generación de PDFs en scripts/generate-pdf.mjs)
const dataDirectory = path.join(process.cwd(), '..', 'backend', 'data');

/**
 * Obtiene la taxonomía completa de las 3 capas (Facility, IT, Workload)
 */
export function getTaxonomy(): TaxonomyLayer[] {
    const fullPath = path.join(dataDirectory, 'taxonomy.json');

    if (!fs.existsSync(fullPath)) {
        return [];
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents) as TaxonomyLayer[];
}

/**
 * Obtiene la información metodológica (TLDM, fuentes, limitaciones)
 */
export function getMethodology(): MethodologyData {
    const fullPath = path.join(dataDirectory, 'methodology.json');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents) as MethodologyData;
}

/**
 * Obtiene las citas académicas, periodísticas y sus metadatos
 */
export function getCitations(): CitationsData {
    const fullPath = path.join(dataDirectory, 'citations.json');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents) as CitationsData;
}