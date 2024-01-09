import { args } from "./config/plugins/args.plugin"
import { writeFile } from "node:fs/promises"
import { mkdirSync } from "node:fs"
;(async () => {
  await main()
})()

async function createTextFile(
  filePath: {
    outputPath: string
    fileName: string
  },
  data: string
) {
  mkdirSync(filePath.outputPath, { recursive: true })
  return writeFile(`${filePath.outputPath}/${filePath.fileName}`, data)
}

async function main() {
  const { b: base, l: limit, s: showTable } = args
  const outputPath = "outputs/"
  const fileName = `tabla-${base}.txt`
  const title = `
=============================
       Tabla del ${base}
=============================\n
`
  let txt = title

  for (let i = 1; i <= limit; i++) {
    txt += `${base} x ${i} = ${base * i}\n`
  }

  if (showTable) console.log(txt)

  createTextFile({ outputPath, fileName }, txt)
    .then(() => {
      console.log("[ok]")
    })
    .catch((error) => {
      console.error("[error]:", error)
    })
}
