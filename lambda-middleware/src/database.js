const uuid = require('uuid/v4');
const { Client } = require('pg')
const client = new Client({
  user: 'terraform',
  host: 'terraform-20181124151006152200000001.ctgvofoww6mt.us-west-2.rds.amazonaws.com',
  database: 'stamper',
  password: process.env.TR_VAR_aws_rds_password,
  port: 5432,
})

const savePictures = async (id, pictures) => {
  await client.connect()

  const [p1, p2, p3] = pictures
  const queryResult = queryResult = await client.query(`INSERT INTO sessions (id, pictures, "createdAt") VALUES ('${id}', '{"${p1}", "${p2}", "${p3}"}' , now())`)

  await client.end()

  return queryResult
}

module.exports = {
  savePictures
}
