import { writeFile } from "fs"
import { map } from "bluebird"
import { get } from "get"
const { host, port = 80, paths, resultsFolder } = require("config.json")

const base = host + ":" + port
const urls = paths.map((s : string) => base + s)
const duration = parseInt(process.argv[2])/1000 || 0

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