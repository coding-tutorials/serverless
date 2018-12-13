const { query } = require('./database')
const uuid = require('uuid/v1')

const add = (ip) => {
  const id = uuid()
  return query(`INSERT INTO sessions (id, ip, "createdAt") VALUES ('${id}', '${ip}' , now())`)
    .then(() => id)
}


module.exports = { add }
