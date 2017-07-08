import { get as oldGet } from "http"

export async function get(url : string) {
  const chunks : string[] = []
  return new Promise<string>((resolve, reject) => {
    oldGet(url, res => {
      if (res.statusCode !== 200) reject(JSON.stringify(res.statusMessage))

      res
      .on("error", err => reject(JSON.stringify(err.message)))
      .on("data", chunk => chunks.push(chunk.toString()))
      .on("end", () => resolve(JSON.stringify(chunks.join(""))))
    })
  })
}