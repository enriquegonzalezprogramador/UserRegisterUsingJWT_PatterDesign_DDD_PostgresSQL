const express = require('express');
const userRoutes = require('./routes/user_routes');
const db = require('./infraestructure/db');
const jwtRoutes = require('./routes/jwt_routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));


// Configuración de las rutas
app.use('/users', userRoutes);

app.use('/jwt', jwtRoutes); 

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
