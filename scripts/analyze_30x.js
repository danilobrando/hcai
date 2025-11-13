const https = require('https');
const fs = require('fs');
const path = require('path');

// Crear directorio de salida
const outputDir = path.join(__dirname, '..', 'analysis');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Función para descargar contenido
function downloadContent(url, filename) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                const filepath = path.join(outputDir, filename);
                fs.writeFileSync(filepath, data);
                console.log(`✓ Descargado: ${filename}`);
                resolve(data);
            });
        }).on('error', (err) => {
            console.error(`✗ Error descargando ${url}:`, err.message);
            reject(err);
        });
    });
}

async function analyze30x() {
    console.log('🔍 Analizando sitio oficial de 30x...\n');
    
    try {
        // Descargar página principal
        const html = await downloadContent('https://www.30x.org/', '30x_homepage.html');
        
        // Extraer CSS y elementos de diseño
        const cssRegex = /<style[^>]*>(.*?)<\/style>/gs;
        const linkRegex = /<link[^>]*href="([^"]*\.css[^"]*)"[^>]*>/gi;
        const scriptRegex = /<script[^>]*src="([^"]*)"[^>]*>/gi;
        
        const cssMatches = html.match(cssRegex) || [];
        const linkMatches = html.match(linkRegex) || [];
        const scriptMatches = html.match(scriptRegex) || [];
        
        // Guardar estilos inline
        const inlineCSS = cssMatches.map(match => match.replace(/<\/?style[^>]*>/g, '')).join('\n\n');
        fs.writeFileSync(path.join(outputDir, '30x_inline_styles.css'), inlineCSS);
        console.log('✓ Estilos inline extraídos');
        
        // Análizar estructura HTML
        const structure = {
            title: (html.match(/<title[^>]*>([^<]+)<\/title>/i) || ['', ''])[1],
            metaDescription: (html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i) || ['', ''])[1],
            headings: (html.match(/<h[1-6][^>]*>/gi) || []).map(h => h.replace(/<[^>]*>/g, '')),
            sections: (html.match(/<section[^>]*>/gi) || []).length,
            cssFiles: linkMatches.map(match => (match.match(/href="([^"]*)"/) || ['', ''])[1]),
            jsFiles: scriptMatches.map(match => (match.match(/src="([^"]*)"/) || ['', ''])[1]),
            colors: extractColors(html),
            gradients: extractGradients(html),
            animations: extractAnimations(html)
        };
        
        // Guardar análisis
        fs.writeFileSync(path.join(outputDir, '30x_structure.json'), JSON.stringify(structure, null, 2));
        console.log('✓ Análisis de estructura guardado');
        
        // Crear reporte
        const report = `
# Análisis del Sitio 30x - Reporte Técnico

## Estructura General
- **Título:** ${structure.title}
- **Descripción:** ${structure.metaDescription}
- **Secciones encontradas:** ${structure.sections}
- **Headings:** ${structure.headings.length}

## Elementos de Diseño Identificados

### Colores Principales
${structure.colors.map(color => `- ${color}`).join('\n')}

### Gradientes
${structure.gradients.map(gradient => `- ${gradient}`).join('\n')}

### Animaciones
${structure.animations.map(anim => `- ${anim}`).join('\n')}

### Archivos CSS
${structure.cssFiles.map(file => `- ${file}`).join('\n')}

### Archivos JavaScript
${structure.jsFiles.map(file => `- ${file}`).join('\n')}

## Headings Encontrados
${structure.headings.map(h => `- ${h}`).join('\n')}
        `;
        
        fs.writeFileSync(path.join(outputDir, '30x_analysis_report.md'), report);
        console.log('✓ Reporte de análisis creado');
        
        console.log('\n🎯 Análisis completado. Archivos guardados en:', outputDir);
        
        return structure;
        
    } catch (error) {
        console.error('Error durante el análisis:', error.message);
        return null;
    }
}

function extractColors(html) {
    const colors = [];
    const colorRegex = /#[0-9a-fA-F]{3,6}|rgb\([^)]*\)|rgba\([^)]*\)/g;
    const matches = html.match(colorRegex) || [];
    
    // Filtrar y contar ocurrencias
    const colorCount = {};
    matches.forEach(color => {
        colorCount[color] = (colorCount[color] || 0) + 1;
    });
    
    // Devolver los más frecuentes
    return Object.entries(colorCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([color]) => color);
}

function extractGradients(html) {
    const gradients = [];
    const gradientRegex = /linear-gradient\([^)]*\)|radial-gradient\([^)]*\)/g;
    const matches = html.match(gradientRegex) || [];
    return [...new Set(matches)].slice(0, 5);
}

function extractAnimations(html) {
    const animations = [];
    const animationRegex = /animation:\s*([^;]*)|@keyframes\s+([^{]+)/gi;
    let match;
    
    while ((match = animationRegex.exec(html)) !== null) {
        animations.push(match[1] || match[2]);
    }
    
    return [...new Set(animations)].slice(0, 5);
}

// Ejecutar análisis
analyze30x();