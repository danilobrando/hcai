const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.tailwindcss.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://cdn.tailwindcss.com"
      ],
      connectSrc: ["'self'"],
      frameSrc: ["'self'"]
    }
  }
}));

// Middleware de CORS
app.use(cors());

// Middleware de compresión
app.use(compression());

// Configuración para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  etag: true
}));

// Ruta principal - sirve el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo de rutas no encontradas - redirige al index para SPA-like behavior
// Solo aplica a rutas sin extensión de archivo para no interferir con assets estáticos
app.get('*', (req, res, next) => {
  if (path.extname(req.path)) {
    return next(); // Deja que Express maneje archivos con extensión (PDFs, imágenes, etc.)
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Hardcore AI Landing Page running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
