const uuid = require('uuid/v4');
const { Pool } = require('pg')
const pool = new Pool({
  user: 'terraform',
  host: 'terraform-20181124151006152200000001.ctgvofoww6mt.us-west-2.rds.amazonaws.com',
  database: 'stamper',
  password: process.env.TR_VAR_aws_rds_password,
  port: 5432,
})

const saveToken = async(ip) => {
  const client = await pool.connect()
  const id = uuid()
  const queryResult = await client.query(`INSERT INTO sessions (id, ip, "createdAt") VALUES ('${id}', '${ip}' , now())`)

  await client.release()

  return id
}

const savePictures = async (id, pictures) => {
  const client = await pool.connect()

  const [p1, p2, p3] = pictures
  const queryResult = await client.query(`UPDATE sessions set pictures = '{"${p1}", "${p2}", "${p3}"}' WHERE id = '${id}'`)

  await client.release()

  return queryResult
}

module.exports = {
  savePictures,
  saveToken
}
