// utils/jwt.js
const jwt = require('jsonwebtoken');

// Función para generar un token JWT
function generateToken(payload, expiresIn = '1h') {
  return jwt.sign(payload, 'palabraclave', { expiresIn });
}

// Función para verificar y decodificar un token JWT
function verifyToken(token) {
  return jwt.verify(token, 'palabraclave');
}

module.exports = { generateToken, verifyToken };
