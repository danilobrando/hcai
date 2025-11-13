const fs = require('fs');
const path = require('path');

// Leer y analizar el archivo HTML descargado
function analyzeHTMLContent() {
    const htmlFile = path.join(__dirname, '..', 'analysis', '30x_page_1763054195059.html');
    
    try {
        const htmlContent = fs.readFileSync(htmlFile, 'utf8');
        console.log('📄 Analizando contenido HTML descargado...\n');
        
        // Extraer elementos clave de diseño
        const title = (htmlContent.match(/<title[^>]*>([^<]+)<\/title>/i) || ['', ''])[1];
        const metaDescription = (htmlContent.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i) || ['', ''])[1];
        
        // Extraer colores
        const colorRegex = /#[0-9a-fA-F]{3,6}|rgb\([^)]*\)|rgba\([^)]*\)/g;
        const colors = [...new Set(htmlContent.match(colorRegex) || [])];
        
        // Extraer CSS inline
        const cssMatches = htmlContent.match(/<style[^>]*>(.*?)<\/style>/gs) || [];
        const inlineCSS = cssMatches.map(match => match.replace(/<\/?style[^>]*>/g, '')).join('\n\n');
        
        // Extraer fonts
        const fontRegex = /font-family:\s*([^;]+)|@import\s+url\([^)]*\)/gi;
        const fonts = [];
        let match;
        while ((match = fontRegex.exec(htmlContent)) !== null) {
            fonts.push(match[1] || match[0]);
        }
        
        // Extraer headings
        const headings = (htmlContent.match(/<h[1-6][^>]*>/gi) || []).map(h => h.replace(/<[^>]*>/g, ''));
        
        // Extraer clases CSS importantes
        const classRegex = /class=["']([^"']*)["']/gi;
        const classes = new Set();
        while ((match = classRegex.exec(htmlContent)) !== null) {
            match[1].split(/\s+/).forEach(cls => classes.add(cls));
        }
        
        // Guardar estilos extraídos
        const cssFile = path.join(__dirname, '..', 'analysis', '30x_extracted_styles.css');
        fs.writeFileSync(cssFile, inlineCSS);
        console.log('✓ Estilos CSS extraídos y guardados');
        
        // Crear reporte de análisis
        const report = `
# Análisis Completo de 30x.org - Reporte de Diseño

## Información General
- **Título:** ${title}
- **Meta Description:** ${metaDescription}

## Elementos de Diseño Identificados

### Colores Principales
${colors.slice(0, 15).map(color => `- ${color}`).join('\n')}

### Fuentes Detectadas
${[...new Set(fonts)].map(font => `- ${font}`).join('\n')}

### Headings Encontrados (${headings.length})
${headings.slice(0, 10).map(h => `- ${h}`).join('\n')}

### Clases CSS Principales (${classes.size} total)
${[...classes].slice(0, 20).map(cls => `- .${cls}`).join('\n')}

### Tamaño del HTML
${(htmlContent.length / 1024).toFixed(2)} KB

### Secciones Detectadas
- $(htmlContent.match(/<section/gi) || []).length secciones
- $(htmlContent.match(/<div/gi) || []).length divs
- $(htmlContent.match(/<nav/gi) || []).length navegaciones

## Estructura del Contenido
${htmlContent.substring(0, 2000)}...
        `;
        
        const reportFile = path.join(__dirname, '..', 'analysis', '30x_design_analysis.md');
        fs.writeFileSync(reportFile, report);
        console.log('✓ Reporte de análisis de diseño creado');
        
        // Guardar datos estructurados
        const designData = {
            title,
            metaDescription,
            colors: colors.slice(0, 15),
            fonts: [...new Set(fonts)],
            headings: headings.slice(0, 10),
            cssClasses: [...classes].slice(0, 30),
            content: htmlContent
        };
        
        const dataFile = path.join(__dirname, '..', 'analysis', '30x_design_data.json');
        fs.writeFileSync(dataFile, JSON.stringify(designData, null, 2));
        console.log('✓ Datos de diseño guardados en JSON');
        
        console.log('\n🎯 Análisis completado');
        console.log('Archivos generados:');
        console.log(`- ${cssFile}`);
        console.log(`- ${reportFile}`);
        console.log(`- ${dataFile}`);
        
        return designData;
        
    } catch (error) {
        console.error('Error analizando HTML:', error.message);
        return null;
    }
}

// Ejecutar análisis
analyzeHTMLContent();