
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DEV_DB_HOST,
      database: process.env.DEV_DB_NAME,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASSWORD,
    },
  },
  production: {
    client: 'mysql2',
    connection: process.env.DATABASE_URL,
  },

};