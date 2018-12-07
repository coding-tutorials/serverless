const stamps = require('./stamps')

const totalStampsWeight = stamps.reduce((accumulator, { id, weight, pictureUrl }) => {
  accumulator.stamps.push({ id, pictureUrl, stripFrom: accumulator.total })
  accumulator.total += Math.round(weight * 100) / 10
  return accumulator
}, {total: 0, stamps: []})

const getRandomStampUrl = () => {
  const randomNumber = Math.random() * totalStampsWeight.total
  return totalStampsWeight.stamps.reverse().find(({ stripFrom }) => stripFrom <= randomNumber)
}

const getRandomStampsUrl = (count) => Array.apply(null, Array(count)).map(() => getRandomStampUrl())

module.exports = { getRandomStampsUrl }
