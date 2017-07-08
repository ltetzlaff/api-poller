#! /usr/bin/env node

import { writeFile, readFileSync } from "fs"
import { get } from "./get"
import { join } from "path"
const { host, port = 80, paths, resultsFolder } = JSON.parse(readFileSync(process.argv[2], { encoding: "utf8" }))

const base = host + ":" + port
const duration = parseInt(process.argv[3])* 1000 || 0

const start = Date.now()
const end = start + duration

const run = async () => {
  paths.forEach((path : string) => {
    const url = base + path
    
    const handler = async () => {
      console.log("Polling " + url)
      
      const contents = await get(url)
      console.log(contents)
      const fileName = join(resultsFolder, Date.now() + "_" + path.replace(/(\\|\/|\?|#|\(|\))/g, "") + ".json")
      writeFile(fileName, contents, { encoding: "utf8" }, err => console.error("error writing", fileName))
      if (Date.now() < end) handler()
    }

    handler()    
  })
}

run()