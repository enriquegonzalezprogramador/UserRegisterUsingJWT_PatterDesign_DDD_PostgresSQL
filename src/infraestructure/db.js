const { Pool } = require('pg');

class Database {
  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'crud_users',
      password: 'postgres',
      port: 5432,
    });
  }

  async query(queryText, params) {
    const client = await this.pool.connect();
    try {
      return await client.query(queryText, params);
    } finally {
      client.release();
    }
  }
}

module.exports = new Database();
