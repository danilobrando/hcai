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
      imgSrc: ["'self'", "data:", "https://placehold.co", "https://www.facebook.com", "https://us.i.posthog.com", "https://us-assets.i.posthog.com"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://cdn.tailwindcss.com",
        "https://connect.facebook.net",
        "https://us.i.posthog.com",
        "https://us-assets.i.posthog.com"
      ],
      connectSrc: [
        "'self'",
        "https://us.i.posthog.com",
        "https://us-assets.i.posthog.com",
        "https://www.facebook.com",
        "https://facebook.com"
      ],
      frameSrc: ["'self'", "https://us.i.posthog.com", "https://us-assets.i.posthog.com"]
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
app.get('*', (req, res) => {
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
