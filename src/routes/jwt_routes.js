
const express = require('express');
const router = express.Router();
const bcrypt = require('../utils/bcrypt');
const { generateToken, verifyToken } = require('../utils/jwt');
const UserService = require('../infraestructure/service/user_serviceImpl');

// Ruta para generar un token JWT (login)
router.post('/login', async (req, res) => {

    // autenticación del usuario, por ejemplo, con credenciales
        const { username, password } = req.body;
        console.log(req.body);

    // Busca al usuario en la base de datos utilizando el servicio de usuario
      const userResp = await UserService.getUserByUsername(username);

      if ( userResp ) {

        const user = userResp;

        console.log(user);
   
        const valitePassword = await bcrypt.matchPassword(password,user.password);

              // Verifica si el usuario existe y si la contraseña es correcta
      if (valitePassword) {
        // Si la autenticación es exitosa, genera un token JWT con el nombre de usuario
        const token = generateToken({ username });
        res.json({ token });
      } else {
        // Si el usuario no existe o la contraseña es incorrecta, devuelve un mensaje de error
        res.status(401).json({ message: 'Invalid username or password' });
      }
    
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }


    


});

// Middleware para proteger las rutas con autenticación JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) {
    return res.sendStatus(401);
  }
  
  try {
    const decodedToken = verifyToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
}


module.exports = router;
