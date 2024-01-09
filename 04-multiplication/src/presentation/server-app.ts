import { CreateTable } from "../domain/use-cases/create-table.use-case"
import { SaveFile } from "../domain/use-cases/save-file.use-case"

interface RunOptions {
  base: number
  limit: number
  showTable: boolean
  fileName: string
  fileDestination: string
}

export class ServerApp {
  static run(options: RunOptions) {
    console.log("[server] running...\n")

    const { base, limit, showTable, fileName, fileDestination } = options

    const table = new CreateTable().execute({ base, limit })
    const wasCreated = new SaveFile().execute({
      fileContent: table,
      fileName,
      fileDestination,
    })

    if (showTable) console.log(table)
    if (wasCreated) {
      console.log("[file] created\n")
    } else {
      console.log("[file] error\n")
    }
  }
}
