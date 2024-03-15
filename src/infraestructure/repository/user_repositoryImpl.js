const db = require('../db');
const UserRepository = require('../../domain/repository/user_repository');

class UserRepositoryImpl extends UserRepository {
  async getAllUsers() {
    const queryText = 'SELECT * FROM users';
    const { rows } = await db.query(queryText);
    return rows;
  }

  async getUserById(id) {
    const queryText = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await db.query(queryText, [id]);
    return rows[0];
  }

  async createUser(user) {
    const { username, email, password } = user;
    const queryText = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await db.query(queryText, [username, email, password]);
    return rows[0];
  }

  async updateUser(id, user) {
    const { username, email, password } = user;
    const queryText = 'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *';
    const { rows } = await db.query(queryText, [username, email, password, id]);
    return rows[0];
  }

  async deleteUser(id) {
    const queryText = 'DELETE FROM users WHERE id = $1';
    await db.query(queryText, [id]);
  }

  async getUserByUsername(username) {
    const queryText = 'SELECT * FROM users WHERE username = $1';
    const { rows } = await db.query(queryText, [username]);
    return rows[0];
  }
}

module.exports = new UserRepositoryImpl();
