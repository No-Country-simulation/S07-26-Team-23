/* global process, console */

import fs from 'fs';
import path from 'path';
import React from 'react';
import matter from 'gray-matter';
import ReactPDF, { Document, Page, Text, View, StyleSheet, Svg, Circle } from '@react-pdf/renderer';

const el = React.createElement;

// ==========================================
// 1. ESTILOS PARA EL DOCUMENTO PDF
// ==========================================
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff',
        color: '#333333',
        justifyContent: 'space-between',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        borderBottomStyle: 'solid',
        paddingBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1B4D3E',
    },
    subtitle: {
        fontSize: 12,
        color: '#666666',
        marginTop: 4,
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#2C5F7C',
    },
    text: {
        fontSize: 10,
        lineHeight: 1.5,
        marginBottom: 4,
    },
    footer: {
        marginTop: 30,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eeeeee',
        borderTopStyle: 'solid',
        fontSize: 9,
        color: '#888888',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

// ==========================================
// 2. COMPONENTE DE PLANTILLA DEL REPORTE PDF (por capa)
// ==========================================
const LayerReportPDF = ({ layer }) => (
    el(
        Document,
        null,
        el(
            Page,
            { size: 'A4', style: styles.page },
            el(
                View,
                null,
                // Cabecera
                el(
                    View,
                    { style: styles.header },
                    el(Text, { style: styles.title }, `Reporte de Capa: ${layer.name}`),
                    el(Text, { style: styles.subtitle }, `Término clave: ${layer.term}`)
                ),
                // Diagnóstico / Observación
                el(
                    View,
                    { style: styles.section },
                    el(Text, { style: styles.sectionTitle }, 'Diagnóstico Observado'),
                    el(Text, { style: styles.text }, layer.observed)
                ),
                // Impacto Económico
                el(
                    View,
                    { style: styles.section },
                    el(Text, { style: styles.sectionTitle }, `Impacto Económico: ${layer.cost.headline} (${layer.cost.unit})`),
                    layer.cost.breakdown.map((item, index) =>
                        el(
                            Text,
                            { key: index, style: styles.text },
                            `• ${item.label}: ${(item.share * 100)}% (${item.amount})`
                        )
                    )
                ),
                // Causas Raíz
                el(
                    View,
                    { style: styles.section },
                    el(Text, { style: styles.sectionTitle }, 'Causas Raíz'),
                    ...layer.rootCauses.map((cause, index) =>
                        el(Text, { key: index, style: styles.text }, `• ${cause}`)
                    )
                )
            ),
            // Atribución obligatoria en el pie de página
            el(Text, { style: styles.footer }, 'Source: PhysaFlow Stranded Capacity Index')
        )
    )
);

// ==========================================
// 3. COMPONENTE DE PLANTILLA DEL REPORTE COMPLETO
// ==========================================
const fullStyles = StyleSheet.create({
    page: {
        padding: 40,
        paddingBottom: 56,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff',
        color: '#1A1A18',
    },
    coverKicker: {
        fontSize: 9,
        color: '#C9A84C',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
    },
    coverTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1B4D3E',
    },
    coverSubtitle: {
        fontSize: 13,
        fontStyle: 'italic',
        color: '#4A4A47',
        marginTop: 4,
        marginBottom: 14,
    },
    meta: {
        fontSize: 9,
        color: '#4A4A47',
        marginTop: 14,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#D3D1C7',
    },
    eyebrow: {
        fontSize: 9,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    h2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1B4D3E',
        marginBottom: 8,
    },
    h3: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    text: {
        fontSize: 10,
        lineHeight: 1.5,
        marginBottom: 6,
        color: '#1A1A18',
    },
    textSecondary: {
        fontSize: 9.5,
        lineHeight: 1.5,
        marginBottom: 4,
        color: '#4A4A47',
    },
    bullet: {
        fontSize: 10,
        lineHeight: 1.5,
        marginBottom: 4,
        color: '#1A1A18',
    },
    section: {
        marginBottom: 22,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#D3D1C7',
    },
    sectionFirst: {
        marginBottom: 22,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#D3D1C7',
        paddingVertical: 5,
    },
    tableHeaderRow: {
        flexDirection: 'row',
        borderBottomWidth: 1.5,
        borderBottomColor: '#1A1A18',
        paddingVertical: 4,
    },
    tableCell: {
        flex: 1,
        fontSize: 9,
        color: '#1A1A18',
        paddingRight: 6,
    },
    tableHeaderCell: {
        flex: 1,
        fontSize: 8,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#4A4A47',
        paddingRight: 6,
    },
    figureBox: {
        marginTop: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: '#D3D1C7',
        flexDirection: 'row',
        alignItems: 'center',
    },
    ringWrap: {
        width: 92,
        height: 92,
        position: 'relative',
        marginRight: 18,
    },
    ringOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 14,
    },
    ringPercentage: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#C9A84C',
    },
    ringCaption: {
        fontSize: 4.2,
        textTransform: 'uppercase',
        color: '#4A4A47',
        textAlign: 'center',
        marginTop: 3,
    },
    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
    },
    legendSwatch: {
        width: 7,
        height: 7,
        marginRight: 5,
    },
    legendText: {
        fontSize: 9,
        color: '#1A1A18',
    },
    footer: {
        position: 'absolute',
        bottom: 24,
        left: 40,
        right: 40,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#eeeeee',
        fontSize: 8,
        color: '#888888',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

// Circunferencia = 100 cuando r = 100 / (2π), así el % mapea 1:1 al dasharray.
const RING_RADIUS = 15.9155;

function RingChart({ color, accent, percentage }) {
    const usable = 100 - percentage;
    return el(
        View,
        { style: fullStyles.ringWrap },
        el(
            Svg,
            { width: 92, height: 92, viewBox: '0 0 36 36' },
            el(Circle, {
                cx: 18,
                cy: 18,
                r: RING_RADIUS,
                fill: 'none',
                stroke: accent,
                strokeWidth: 3.6,
            }),
            el(Circle, {
                cx: 18,
                cy: 18,
                r: RING_RADIUS,
                fill: 'none',
                stroke: color,
                strokeWidth: 3.6,
                strokeDasharray: `${usable} ${100 - usable}`,
                strokeDashoffset: 25,
            })
        ),
        el(
            View,
            { style: fullStyles.ringOverlay },
            el(Text, { style: fullStyles.ringPercentage }, `${percentage}%`),
            el(Text, { style: fullStyles.ringCaption }, 'Capacidad no utilizable')
        )
    );
}

function Table({ columns, rows }) {
    return el(
        View,
        { style: { marginTop: 8 } },
        el(
            View,
            { style: fullStyles.tableHeaderRow },
            columns.map((col, i) => el(Text, { key: i, style: fullStyles.tableHeaderCell }, col))
        ),
        rows.map((row, i) =>
            el(
                View,
                { key: i, style: fullStyles.tableRow },
                row.map((cell, j) => el(Text, { key: j, style: fullStyles.tableCell }, cell))
            )
        )
    );
}

function Bullets({ items }) {
    return el(
        View,
        null,
        items.map((item, i) => el(Text, { key: i, style: fullStyles.bullet }, `•  ${item}`))
    );
}

function Prose({ content }) {
    const blocks = content.split(/\n{2,}/).filter(Boolean);
    return el(
        View,
        null,
        blocks.map((block, i) => {
            const lines = block.split('\n').filter(Boolean);
            const isList = lines.length > 0 && lines.every((line) => line.trim().startsWith('- '));
            if (isList) {
                return el(Bullets, { key: i, items: lines.map((l) => l.replace(/^-\s*/, '')) });
            }
            return el(Text, { key: i, style: fullStyles.text }, block);
        })
    );
}

function LayerSection({ layer, number, first }) {
    const { title, percentage } = layer.illustrativeFigure;
    return el(
        View,
        { style: first ? fullStyles.sectionFirst : fullStyles.section },
        el(Text, { style: [fullStyles.eyebrow, { color: layer.color }] }, `${String(number).padStart(2, '0')} / ${layer.name}`),
        el(Text, { style: fullStyles.h2 }, layer.term),
        el(Text, { style: fullStyles.textSecondary }, layer.translation),
        el(Text, { style: fullStyles.text }, layer.observed),

        el(Text, { style: [fullStyles.h3, { marginTop: 8 }] }, 'Señales del operador'),
        el(Bullets, { items: layer.signals }),

        el(Text, { style: [fullStyles.h3, { marginTop: 8 }] }, 'Impacto operativo'),
        el(Text, { style: fullStyles.text }, `Infraestructura: ${layer.operationalImpact.infrastructure}`),
        el(Text, { style: fullStyles.text }, `Económico: ${layer.operationalImpact.economic}`),

        el(Text, { style: [fullStyles.h3, { marginTop: 8 }] }, `Impacto estimado: ${layer.cost.headline}`),
        el(Text, { style: fullStyles.textSecondary }, layer.cost.unit),

        el(Text, { style: [fullStyles.h3, { marginTop: 8 }] }, layer.metricsCaption),
        el(Table, {
            columns: ['Métrica', 'Valor típico', 'Valor eficiente'],
            rows: layer.metrics.map((m) => [m.label, m.typical, m.efficient]),
        }),

        el(Text, { style: [fullStyles.h3, { marginTop: 12 }] }, `Figura ${String(number).padStart(2, '0')} / Dato ilustrativo — ${title}`),
        el(
            View,
            { style: fullStyles.figureBox },
            el(RingChart, { color: layer.color, accent: '#C9A84C', percentage }),
            el(
                View,
                null,
                el(
                    View,
                    { style: fullStyles.legendRow },
                    el(View, { style: [fullStyles.legendSwatch, { backgroundColor: layer.color }] }),
                    el(Text, { style: fullStyles.legendText }, `Trabajo útil: ${100 - percentage}%`)
                ),
                el(
                    View,
                    { style: fullStyles.legendRow },
                    el(View, { style: [fullStyles.legendSwatch, { backgroundColor: '#C9A84C' }] }),
                    el(Text, { style: fullStyles.legendText }, `Capacidad no utilizable: ${percentage}%`)
                ),
                el(Text, { style: [fullStyles.textSecondary, { marginTop: 4, maxWidth: 260 }] },
                    'Proporción ilustrativa; no representa telemetría en tiempo real.')
            )
        )
    );
}

function FullReportPDF({ sections, taxonomy, methodology }) {
    const get = (id) => sections.find((s) => s.id === id) || { title: '', content: '' };
    const introduccion = get('introduccion');
    const taxonomia = get('taxonomia');
    const metodologia = get('metodologia');
    const limitaciones = get('limitaciones');
    const referencias = get('referencias');

    return el(
        Document,
        null,
        el(
            Page,
            { size: 'A4', style: fullStyles.page, wrap: true },
            el(
                View,
                null,
                // Portada / Introducción
                el(
                    View,
                    { style: fullStyles.sectionFirst },
                    el(Text, { style: fullStyles.coverKicker }, 'PhysaFlow Investigación'),
                    el(Text, { style: fullStyles.coverTitle }, introduccion.title),
                    el(Text, { style: fullStyles.coverSubtitle }, introduccion.subtitle || ''),
                    el(Prose, { content: introduccion.content }),
                    el(
                        Text,
                        { style: fullStyles.meta },
                        `Autoría: ${introduccion.author || 'PhysaFlow'}   ·   Versión ${introduccion.version || '1.0'}   ·   Lectura ${introduccion.readTime || ''}`
                    )
                ),

                // 01 · Definición
                el(
                    View,
                    { style: fullStyles.section },
                    el(Text, { style: [fullStyles.eyebrow, { color: '#1B4D3E' }] }, '01 / Definición'),
                    el(Text, { style: fullStyles.h2 }, taxonomia.title),
                    el(Prose, { content: taxonomia.content }),
                    taxonomia.includes && el(Text, { style: fullStyles.textSecondary }, `Incluye: ${taxonomia.includes}`),
                    taxonomia.excludes && el(Text, { style: fullStyles.textSecondary }, `No incluye: ${taxonomia.excludes}`)
                ),

                // 02 · Taxonomía general
                el(
                    View,
                    { style: fullStyles.section },
                    el(Text, { style: [fullStyles.eyebrow, { color: '#1B4D3E' }] }, '02 / Taxonomía general'),
                    el(Text, { style: fullStyles.h2 }, 'Tres capas, un mismo sistema.'),
                    el(Table, {
                        columns: ['Capa', 'Término', 'Traducción'],
                        rows: taxonomy.map((l) => [l.name, l.term, l.translation]),
                    })
                ),

                // 03-05 · Capas
                ...taxonomy.map((layer, i) => el(LayerSection, { key: layer.id, layer, number: i + 3 })),

                // 06 · Metodología
                el(
                    View,
                    { style: fullStyles.section },
                    el(Text, { style: [fullStyles.eyebrow, { color: '#1B4D3E' }] }, '06 / Metodología'),
                    el(Text, { style: fullStyles.h2 }, metodologia.title),
                    el(Prose, { content: metodologia.content }),
                    el(Table, {
                        columns: ['Capa', 'Fuente de medición', 'Qué mide'],
                        rows: methodology.measurement.map((row) => [
                            methodology.framework.layers.find((l) => l.id === row.layer)?.name || row.layer,
                            row.source,
                            row.measures,
                        ]),
                    })
                ),

                // 07 · Limitaciones
                el(
                    View,
                    { style: fullStyles.section },
                    el(Text, { style: [fullStyles.eyebrow, { color: '#1B4D3E' }] }, '07 / Limitaciones'),
                    el(Text, { style: fullStyles.h2 }, limitaciones.title),
                    el(Prose, { content: limitaciones.content }),
                    el(Bullets, { items: methodology.limitations })
                ),

                // 08 · Referencias
                el(
                    View,
                    { style: fullStyles.section },
                    el(Text, { style: [fullStyles.eyebrow, { color: '#1B4D3E' }] }, '08 / Referencias'),
                    el(Text, { style: fullStyles.h2 }, referencias.title),
                    el(Prose, { content: referencias.content })
                )
            ),
            el(
                Text,
                { style: fullStyles.footer, render: ({ pageNumber, totalPages }) => `Source: PhysaFlow Stranded Capacity Index — página ${pageNumber} de ${totalPages}` },
                'Source: PhysaFlow Stranded Capacity Index'
            )
        )
    );
}

// ==========================================
// 4. LECTURA DE CONTENIDO MARKDOWN (mismas secciones que /reporte)
// ==========================================
const SECTION_SLUGS = [
    { id: 'introduccion', slug: 'introduccion' },
    { id: 'taxonomia', slug: 'taxonomia' },
    { id: 'metodologia', slug: 'metodologia' },
    { id: 'limitaciones', slug: 'limitaciones' },
    { id: 'referencias', slug: 'referencias' },
];

function readSections(contentDir) {
    return SECTION_SLUGS.map(({ id, slug }) => {
        const fullPath = path.join(contentDir, `${slug}.md`);
        if (!fs.existsSync(fullPath)) {
            return { id, title: id, content: '' };
        }
        const raw = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(raw);
        return {
            id,
            title: typeof data.title === 'string' ? data.title : id,
            content: content.trim(),
            subtitle: typeof data.subtitle === 'string' ? data.subtitle : undefined,
            author: typeof data.author === 'string' ? data.author : undefined,
            version: typeof data.version === 'string' ? data.version : undefined,
            readTime: typeof data.readTime === 'string' ? data.readTime : undefined,
            includes: typeof data.includes === 'string' ? data.includes : undefined,
            excludes: typeof data.excludes === 'string' ? data.excludes : undefined,
        };
    });
}

// ==========================================
// 5. PIPELINE DE GENERACIÓN
// ==========================================
async function generatePDFs() {
    console.log("📄 Iniciando pipeline de generación de PDFs (BE-PDF-01)...");

    // Ruta hacia el backend/data
    const backendDataPath = path.join(process.cwd(), '..', 'backend', 'data');
    const taxonomyPath = path.join(backendDataPath, 'taxonomy.json');
    const methodologyPath = path.join(backendDataPath, 'methodology.json');
    // Ruta hacia el contenido editorial (frontend/content)
    const contentDir = path.join(process.cwd(), 'content');
    // Ruta pública de destino en el frontend para descargas
    const outputDir = path.join(process.cwd(), 'public', 'downloads');

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    if (!fs.existsSync(taxonomyPath)) {
        console.error("❌ No se encontró el archivo `taxonomy.json` en el backend.");
        process.exit(1);
    }

    try {
        const layers = JSON.parse(fs.readFileSync(taxonomyPath, 'utf-8'));

        for (const layer of layers) {
            const fileName = `physaflow-report-${layer.id}.pdf`;
            const outputPath = path.join(outputDir, fileName);

            const pdfStream = await ReactPDF.renderToStream(el(LayerReportPDF, { layer }));
            const writeStream = fs.createWriteStream(outputPath);
            pdfStream.pipe(writeStream);

            await new Promise((resolve, reject) => {
                writeStream.on('finish', resolve);
                writeStream.on('error', reject);
            });

            console.log(`✅ PDF generado exitosamente: /public/downloads/${fileName}`);
        }

        // Reporte completo (todas las secciones, incluidas las figuras ilustrativas)
        if (fs.existsSync(methodologyPath)) {
            const methodology = JSON.parse(fs.readFileSync(methodologyPath, 'utf-8'));
            const sections = readSections(contentDir);

            const fullFileName = 'physaflow-report-completo.pdf';
            const fullOutputPath = path.join(outputDir, fullFileName);

            const fullPdfStream = await ReactPDF.renderToStream(
                el(FullReportPDF, { sections, taxonomy: layers, methodology })
            );
            const fullWriteStream = fs.createWriteStream(fullOutputPath);
            fullPdfStream.pipe(fullWriteStream);

            await new Promise((resolve, reject) => {
                fullWriteStream.on('finish', resolve);
                fullWriteStream.on('error', reject);
            });

            console.log(`✅ PDF generado exitosamente: /public/downloads/${fullFileName}`);
        } else {
            console.warn("⚠️ No se encontró `methodology.json`; se omitió el PDF completo.");
        }

        console.log("\n🎉 ¡Todos los reportes en PDF fueron generados e indexados correctamente!");
    } catch (error) {
        console.error("❌ Error generando los archivos PDF:", error);
        process.exit(1);
    }
}

generatePDFs();
