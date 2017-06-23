const { writeFile } = require("fs")
const { map } = require("bluebird")
const { host, port = 80, paths, resultsFolder } = require("config.json")

const base = host + ":" + port
const urls = paths.map(s => base + s)
const duration = process.argv[2] || 0

const start = Date.now()
const end = start + duration

const run = async () => {
  while (Date.now() < end) {
    await map(paths, async path => {
      const url = base + path
      console.log("Polling " + url)
      const contents = await get(url)
      console.log(contents)
      const fileName = resultsFolder + Date.now() + "_" + path + ".json"
      writeFile(fileName, contents, "utf8", () => {})
    })
  }
}

run()