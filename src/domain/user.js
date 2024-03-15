class User {
    constructor(username, email, password) {

      this.username = username;
      this.email = email;
      this.password = password;
    }
  
 
  
    getUsername() {
      return this.username;
    }
  
    getEmail() {
      return this.email;
    }
  
    getPassword() {
      return this.password;
    }
  
  
  
    setUsername(username) {
      this.username = username;
    }
  
    setEmail(email) {
      this.email = email;
    }
  
    setPassword(password) {
      this.password = password;
    }
  }
  
  module.exports = User;
  