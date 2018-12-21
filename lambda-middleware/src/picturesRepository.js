const { query } = require('./database')

const get =  async(id) => {
  const result = await query(`SELECT "base64Picture" FROM pictures WHERE id = '${id}'`)
  return result.rows[0]['base64Picture']
}

module.exports = { get }
