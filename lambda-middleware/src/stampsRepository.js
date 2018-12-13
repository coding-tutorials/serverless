const { query } = require('./database')
const uuid = require('uuid/v1')

const add =  async(sessionId, pictureUrls) => {
  const id = uuid()
  await query(`INSERT INTO stamps (id, "sessionId", "originalPicturesUrls", "createdAt") VALUES ('${id}', '${sessionId}' , '{${pictureUrls.map((x) => `"${x}"`).join(',')}}', now())`)
  return id
}

const addPicture = async (stampId, base64Picture) => {
  const pictureId = uuid()
  await query(`INSERT INTO pictures (id, "base64Picture", "createdAt") VALUES ('${pictureId}', '${base64Picture}' , now())`)
  return await query(`UPDATE stamps SET "stampedPicturesIds" = "stampedPicturesIds" || '{"${pictureId}"}' WHERE id = '${stampId}'`)
}

module.exports = { add, addPicture }
