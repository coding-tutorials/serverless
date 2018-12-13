const logger = require('./logger')
const uuid = require('uuid/v4')
const { Pool } = require('pg')
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_URL,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: 5432
})

const query = async(query) => {
  logger.info('database', 'connecting')
  const client = await pool.connect()

  logger.info('database', query)

  return client.query(query)
    .then((result) => {
      client.release()
      logger.info('database', 'query executed')
      return result
    }).catch((e) => {
      logger.error('database.query', e, e.stack)
      return client.release()
    })
}

module.exports = { query }
