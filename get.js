const { get: oldGet } = require("http")

const get = async (url) => {
  const chunks = []
  return new Promise((resolve, reject) => {
    oldGet(url, res => {
      if (res.statusCode !== 200) reject(JSON.stringify(res.statusMessage))

      res
      .on("error", err => reject(err))
      .on("data", chunk => chunks.push(chunk))
      .on("end", () => resolve(JSON.stringify(chunks.join(""))))
    })
  })
}

module.exports = { get }