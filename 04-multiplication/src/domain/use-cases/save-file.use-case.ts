import { mkdirSync, writeFileSync } from "fs"

export interface SaveFileUseCase {
  execute: (options: SaveFileOptions) => boolean
}

export interface SaveFileOptions {
  fileContent: string
  fileDestination?: string
  fileName?: string
}

export class SaveFile implements SaveFileUseCase {
  constructor() {}

  execute({
    fileContent,
    fileDestination = "./outputs",
    fileName = "table",
  }: SaveFileOptions) {
    try {
      const path = `${fileDestination}/${fileName}.txt`
      mkdirSync(fileDestination, { recursive: true })
      writeFileSync(path, fileContent)
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }
}
