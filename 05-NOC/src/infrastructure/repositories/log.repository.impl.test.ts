import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"
import { LogRepositoryImpl } from "./log.repository.impl"

describe("LogRepositoryImpl", () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const logRepositoryImpl = new LogRepositoryImpl(mockLogDatasource)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("saveLog should call the datasource with arguments", () => {
    const log = new LogEntity({
      message: "log-message",
      level: LogSeverityLevel.low,
      origin: "log.repository.impl.test.ts",
    })

    logRepositoryImpl.saveLog(log)

    expect(mockLogDatasource.saveLog).toHaveBeenCalledTimes(1)
    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log)
  })

  test("getLogs should call the datasource with arguments", () => {
    logRepositoryImpl.getLogs(LogSeverityLevel.low)

    expect(mockLogDatasource.getLogs).toHaveBeenCalledTimes(1)
    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low)
  })
})
