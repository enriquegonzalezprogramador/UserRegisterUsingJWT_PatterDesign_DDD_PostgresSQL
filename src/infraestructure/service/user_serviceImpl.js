const UserRepositoryImpl = require('../../infraestructure/repository/user_repositoryImpl');
const UserService = require('../../application/service/user_service');

class UserServiceImpl extends UserService  {
    
  async getAllUsers() {
    try {
      return await UserRepositoryImpl.getAllUsers();
    } catch (error) {
      throw new Error('Error retrieving users: ' + error.message);
    }
  }

  async getUserById(id) {
    try {
      return await UserRepositoryImpl.getUserById(id);
    } catch (error) {
      throw new Error('Error retrieving user by ID: ' + error.message);
    }
  }

  async createUser(user) {
    try {
      return await UserRepositoryImpl.createUser(user);
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  async updateUser(id, user) {
    try {
      return await UserRepositoryImpl.updateUser(id, user);
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }

  async deleteUser(id) {
    try {
      await UserRepositoryImpl.deleteUser(id);
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }

  async getUserByUsername(username){
    try {
      return await UserRepositoryImpl.getUserByUsername(username);
    } catch (error) {
      throw new Error('Error retrieving user by username: ' + error.message);
    }
  }
}

module.exports = new UserServiceImpl();