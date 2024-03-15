const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user_routes');
const db = require('./infraestructure/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Configuración de las rutas
app.use('/users', userRoutes);

// Conexión a la base de datos
db.pool.connect()
  .then(() => {
    console.log('Connected to database');
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to database:', err.message);
  });
