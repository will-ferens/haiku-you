require('dotenv').load()


module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/haikus'
  },

  production: {
    client: 'postgresql',
    connection: `${process.env.DATABASE_URL}?ssl=true`
  }
}
