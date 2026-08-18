/* global process, console */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

// ==========================================
// 1. ESQUEMA DE VALIDACIÓN PARA JSON (Zod)
// ==========================================
const costBreakdownSchema = z.object({
    headline: z.string(),
    unit: z.string(),
    breakdown: z.array(
        z.object({
            label: z.string(), // Corregido de category a label
            share: z.number().min(0).max(1),
            amount: z.string(),
        })
    ).refine(
        (items) => {
            const totalShare = items.reduce((acc, item) => acc + item.share, 0);
            return Math.abs(totalShare - 1) <= 0.01;
        },
        { message: "Los porcentajes (shares) en cost.breakdown deben sumar aproximadamente 1 (100%)." }
    ),
});

const metricSchema = z.object({
    label: z.string(), // Corregido de name a label
    typical: z.string(),
    efficient: z.string(),
    chartable: z.boolean(),
});

const operationalImpactSchema = z.object({
    infrastructure: z.string(),
    economic: z.string(),
});

const layerSchema = z.object({
    id: z.string(),
    name: z.string(),
    term: z.string(),
    translation: z.string(),
    color: z.string(),
    tag: z.string(),
    code: z.string(),
    observed: z.string(), // Acepta texto descriptivo detallado
    cost: costBreakdownSchema,
    rootCauses: z.array(z.string()),
    metrics: z.array(metricSchema),
    metricsCaption: z.string(),
    signalsIntro: z.string(),
    signals: z.array(z.string()),
    operationalImpact: operationalImpactSchema,
    relatedTerms: z.array(z.string()),
    version: z.string(),
    permalink: z.string(),
    lastReview: z.string(),
    sourceLabel: z.string(),
    whatYouSee: z.string(),
    whyItHappens: z.string(),
    keyIndicators: z.string(),
    layerRelation: z.string(),
});

const taxonomySchema = z.array(layerSchema);

// ==========================================
// 2. ESQUEMA DE VALIDACIÓN PARA FRONTMATTER (MDX)
// ==========================================
const mdxFrontmatterSchema = z.object({
    layerId: z.string(),
    title: z.string(),
    author: z.string().optional(),
});

// ==========================================
// 3. FUNCIÓN PRINCIPAL DE EJECUCIÓN
// ==========================================
function validateContent() {
    console.log("🔍 Iniciando validación de contenido (BE-VAL-01)...");
    let hasErrors = false;

    const taxonomyPath = path.join(process.cwd(), '..', 'backend', 'data', 'taxonomy.json');
    const contentDir = path.join(process.cwd(), 'content');

    // --- A. Validar taxonomy.json ---
    let validLayerIds = [];
    if (fs.existsSync(taxonomyPath)) {
        try {
            const rawData = fs.readFileSync(taxonomyPath, 'utf-8');
            const jsonData = JSON.parse(rawData);

            const result = taxonomySchema.safeParse(jsonData);
            if (!result.success) {
                console.error("❌ Error de validación en `taxonomy.json`:");
                console.error(JSON.stringify(result.error.format(), null, 2));
                hasErrors = true;
            } else {
                console.log("✅ `taxonomy.json` es válido.");
                validLayerIds = result.data.map((l) => l.id);
            }
        } catch (e) {
            console.error("❌ Error al parsear el archivo JSON de taxonomía:", e);
            hasErrors = true;
        }
    } else {
        console.warn("⚠️ No se encontró el archivo `taxonomy.json` en la ruta especificada.");
    }

    // --- B. Validar Archivos MDX ---
    if (fs.existsSync(contentDir)) {
        const mdxFiles = fs.readdirSync(contentDir).filter((file) => file.endsWith('.mdx'));

        mdxFiles.forEach((file) => {
            const filePath = path.join(contentDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');

            try {
                const { data: frontmatter } = matter(fileContent);
                const fmResult = mdxFrontmatterSchema.safeParse(frontmatter);

                if (!fmResult.success) {
                    console.error(`❌ Frontmatter inválido en el archivo MDX: ${file}`);
                    console.error(JSON.stringify(fmResult.error.format(), null, 2));
                    hasErrors = true;
                } else {
                    const referencedLayerId = fmResult.data.layerId;
                    if (validLayerIds.length > 0 && !validLayerIds.includes(referencedLayerId)) {
                        console.error(`❌ Error en ${file}: El layerId ("${referencedLayerId}") no coincide con ningún ID definido en 'taxonomy.json'.`);
                        hasErrors = true;
                    } else {
                        console.log(`✅ MDX válido: ${file}`);
                    }
                }
            } catch (e) {
                console.error(`❌ Error procesando el archivo MDX ${file}:`, e);
                hasErrors = true;
            }
        });
    } else {
        console.warn("⚠️ No se encontró la carpeta de contenido `/content`.");
    }

    // --- C. Resultado Final ---
    if (hasErrors) {
        console.error("\n💥 La validación falló. Por favor corrige los errores anteriores.");
        process.exit(1);
    } else {
        console.log("\n🎉 ¡Todo el contenido JSON y MDX es válido exitosamente!");
        process.exit(0);
    }
}

validateContent();