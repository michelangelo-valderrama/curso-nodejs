import { SaveFile } from "./save-file.use-case"
import fs from "fs"

describe("SaveFileUseCase", () => {
  const saveFile = new SaveFile()

  afterEach(() => {
    // clean up
    // const outputsPath = "./outputs"
    // const outputsDirExists = fs.existsSync(outputsPath)
    // if (outputsDirExists) fs.rmSync(outputsPath, { recursive: true })

    const customOutputsPath = "./custom-outputs"
    const customOutputsDirExists = fs.existsSync(customOutputsPath)
    if (customOutputsDirExists)
      fs.rmSync(customOutputsPath, { recursive: true })
  })

  test("should save file with default values", () => {
    const options = {
      fileContent: "test content",
    }
    const filePath = "./outputs/table.txt"

    const result = saveFile.execute(options)
    const fileExists = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" })

    expect(result).toBe(true)
    expect(fileExists).toBe(true)
    expect(fileContent).toBe(options.fileContent)
  })

  test("should save file with custom values", () => {
    const options = {
      fileContent: "custom content",
      fileDestination: "./custom-outputs/file-destination",
      fileName: "custom-table-name",
    }
    const filePath = `${options.fileDestination}/${options.fileName}.txt`

    const result = saveFile.execute(options)
    const fileExists = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" })

    expect(result).toBe(true)
    expect(fileExists).toBe(true)
    expect(fileContent).toBe(options.fileContent)
  })

  test("should return false if directory could not be created", () => {
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("This is a custom error message from testing")
    })

    const result = saveFile.execute({ fileContent: "hello" })

    expect(result).toBe(false)

    mkdirSpy.mockRestore()
  })

  test("should return false if file could not be created", () => {
    const writeFileSpy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error("This is a custom error message from testing")
      })

    const result = saveFile.execute({ fileContent: "hello" })

    expect(result).toBe(false)

    writeFileSpy.mockRestore()
  })
})
