import * as fs from "fs"

interface SaveJson {
  path: string // example: "layout/countries.json"
  data: object // example: { countries: [ ...countries ] }
}

export const saveJson = async ({ path, data }: SaveJson) => {
  const string = JSON.stringify(data)

  fs.readFile(path, "utf8", function readFileCallback(err, data) {
    if (err) {
      fs.writeFile(path, string, "utf8", function (err: unknown) {
        if (err) {
          console.error(err)
          throw new Error(JSON.stringify(err))
        }
      })
    } else {
      fs.writeFile(path, string, "utf8", function (err: unknown) {
        if (err) {
          console.error(err)
          throw new Error(JSON.stringify(err))
        }
      })
    }
  })
}
