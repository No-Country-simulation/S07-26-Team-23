import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactPDF, { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
// 2. COMPONENTE DE PLANTILLA DEL REPORTE PDF
// ==========================================
const LayerReportPDF = ({ layer }) => (
    React.createElement(
        Document,
        null,
        React.createElement(
            Page,
            { size: 'A4', style: styles.page },
            React.createElement(
                View,
                null,
                // Cabecera
                React.createElement(
                    View,
                    { style: styles.header },
                    React.createElement(Text, { style: styles.title }, `Reporte de Capa: ${layer.name}`),
                    React.createElement(Text, { style: styles.subtitle }, `Término clave: ${layer.term}`)
                ),
                // Diagnóstico / Observación
                React.createElement(
                    View,
                    { style: styles.section },
                    React.createElement(Text, { style: styles.sectionTitle }, 'Diagnóstico Observado'),
                    React.createElement(Text, { style: styles.text }, layer.observed)
                ),
                // Impacto Económico
                React.createElement(
                    View,
                    { style: styles.section },
                    React.createElement(Text, { style: styles.sectionTitle }, `Impacto Económico: ${layer.cost.headline} (${layer.cost.unit})`),
                    layer.cost.breakdown.map((item, index) =>
                        React.createElement(
                            Text,
                            { key: index, style: styles.text },
                            `• ${item.label}: ${(item.share * 100)}% (${item.amount})`
                        )
                    )
                ),
                // Causas Raíz
                React.createElement(
                    View,
                    { style: styles.section },
                    React.createElement(Text, { style: styles.sectionTitle }, 'Causa Raíz'),
                    React.createElement(Text, { style: styles.text }, layer.rootCause)
                )
            ),
            // Atribución obligatoria en el pie de página
            React.createElement(
                Text,
                { style: styles.footer },
                'Source: PhysaFlow Stranded Capacity Index'
            )
        )
    )
);

// ==========================================
// 3. PIPELINE DE GENERACIÓN
// ==========================================
async function generatePDFs() {
    console.log("📄 Iniciando pipeline de generación de PDFs (BE-PDF-01)...");

    // Ruta hacia el taxonomy.json en el backend
    const taxonomyPath = path.join(process.cwd(), '..', 'backend', 'data', 'taxonomy.json');
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
        const rawData = fs.readFileSync(taxonomyPath, 'utf-8');
        const layers = JSON.parse(rawData);

        for (const layer of layers) {
            const fileName = `physaflow-report-${layer.id}.pdf`;
            const outputPath = path.join(outputDir, fileName);

            // Renderizar el documento a un stream de archivo
            const pdfStream = await ReactPDF.renderToStream(
                React.createElement(LayerReportPDF, { layer })
            );

            const writeStream = fs.createWriteStream(outputPath);
            pdfStream.pipe(writeStream);

            await new Promise((resolve, reject) => {
                writeStream.on('finish', resolve);
                writeStream.on('error', reject);
            });

            console.log(`✅ PDF generado exitosamente: /public/downloads/${fileName}`);
        }

        console.log("\n🎉 ¡Todos los reportes en PDF fueron generados e indexados correctamente!");
    } catch (error) {
        console.error("❌ Error generando los archivos PDF:", error);
        process.exit(1);
    }
}

generatePDFs();