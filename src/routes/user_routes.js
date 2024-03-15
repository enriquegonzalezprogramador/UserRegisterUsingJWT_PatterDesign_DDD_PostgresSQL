const express = require('express');
const router = express.Router();
const UserService = require('../infraestructure/service/user_serviceImpl');
const { verifyToken } = require('../utils/jwt');


router.get('/', async (req, res) => {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
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
  
  // Aplica el middleware de autenticación JWT a todas las rutas de user_routes.js
  //router.use(authenticateToken);



router.get('/:id',authenticateToken,   async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
    const newUser = await UserService.createUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id',authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await UserService.updateUser(id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id',authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    await UserService.deleteUser(id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

