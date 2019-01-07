require('dotenv').config({ path: '.env.local' })

const dbConfig = {
    development: {
      client: process.env.DB_CONNECTION,
      connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE
      },
      useNullAsDefault: true,
      migrations: {
        directory: './db/migrations'
      },
      seeds: {
        directory: './db/seeds'  
      }
    }
}

export default dbConfig
