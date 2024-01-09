import { CreateTable } from "./create-table.use-case"

describe("CreateTableUseCase", () => {
  const createTable = new CreateTable()

  test("should create table with default values", () => {
    const table = createTable.execute({ base: 2 })
    const rows = table.split("\n").length

    expect(createTable).toBeInstanceOf(CreateTable)
    expect(table).toContain("2 x 1 = 2")
    expect(table).toContain("2 x 10 = 20")
    expect(rows).toBe(10)
  })

  test("should create table with custom values", () => {
    const options = { base: 3, limit: 20 }

    const table = createTable.execute(options)
    const rows = table.split("\n").length

    expect(table).toContain(`${options.base} x 1 = ${options.base}`)
    expect(table).toContain(`${options.base} x 10 = ${options.base}0`)
    expect(table).toContain(
      `${options.base} x ${options.limit} = ${options.base * options.limit}`
    )
    expect(rows).toBe(options.limit)
  })
})
