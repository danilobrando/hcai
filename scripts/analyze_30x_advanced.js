const https = require('https');
const fs = require('fs');
const path = require('path');

// Crear directorio de salida
const outputDir = path.join(__dirname, '..', 'analysis');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Función para descargar contenido con headers
function downloadContent(url, filename, customHeaders = {}) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                ...customHeaders
            }
        };

        https.get(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                const filepath = path.join(outputDir, filename);
                fs.writeFileSync(filepath, data);
                console.log(`✓ Descargado: ${filename} (Status: ${res.statusCode})`);
                resolve({ data, statusCode: res.statusCode });
            });
        }).on('error', (err) => {
            console.error(`✗ Error descargando ${url}:`, err.message);
            reject(err);
        });
    });
}

async function analyze30xWithHeaders() {
    console.log('🔍 Analizando 30x con diferentes enfoques...\n');
    
    const urls = [
        'https://www.30x.org/',
        'https://www.30x.org',
        'https://30x.org/',
        'https://30x.org',
        'https://www.30x.org/about',
        'https://www.30x.org/contact',
        'https://www.30x.org/xtreme-sales'
    ];
    
    try {
        for (const url of urls) {
            try {
                console.log(`\n📄 Intentando: ${url}`);
                const result = await downloadContent(url, `30x_page_${Date.now()}.html`);
                
                if (result.statusCode !== 403) {
                    console.log(`✅ Acceso exitoso a ${url}`);
                    return result.data;
                }
            } catch (error) {
                console.log(`❌ Error con ${url}: ${error.message}`);
            }
        }
        
        console.log('\n⚠️  No se pudo acceder a ninguna página pública de 30x');
        return null;
        
    } catch (error) {
        console.error('Error durante el análisis:', error.message);
        return null;
    }
}

// Ejecutar análisis
analyze30xWithHeaders();