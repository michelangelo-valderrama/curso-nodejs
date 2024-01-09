import { LogEntity } from "../../entities/log.entity"
import { CheckServiceMultiple } from "./check-service-multiple"

describe("CheckServiceMultiple UseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockRepository01 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }
  const mockRepository02 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }
  const mockRepositories = [mockRepository01, mockRepository02]

  const successCallback = jest.fn()
  const errorCallback = jest.fn()

  const checkServiceMultiple = new CheckServiceMultiple(
    mockRepositories,
    successCallback,
    errorCallback
  )

  test("should call successCallback when fetch return true", async () => {
    const wasOk = await checkServiceMultiple.execute("https://google.com")

    expect(wasOk).toBe(true)

    expect(successCallback).toHaveBeenCalled()
    expect(errorCallback).not.toHaveBeenCalled()

    expect(mockRepository01.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepository02.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
  })

  test("should call errorCallback when fetch returns false", async () => {
    const wasOk = await checkServiceMultiple.execute(
      "https://googlejshkjha.com"
    )

    expect(wasOk).toBe(false)

    expect(successCallback).not.toHaveBeenCalled()
    expect(errorCallback).toHaveBeenCalled()

    expect(mockRepository01.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepository02.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
  })
})
