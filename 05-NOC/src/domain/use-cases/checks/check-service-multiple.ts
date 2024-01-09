import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"

const origin = "check-service.ts"

export interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>
}

type SuccessCallback = () => void
type ErrorCallback = (error: string) => void

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepositories: LogRepository[],
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback
  ) {}

  private callLogs(log: LogEntity) {
    this.logRepositories.forEach((logRepository) => {
      logRepository.saveLog(log)
    })
  }

  async execute(url: string) {
    try {
      const req = await fetch(url)

      if (!req.ok) {
        throw new Error(`[check service] error: ${url}`)
      }

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Service ${url} working`,
        origin,
      })
      this.callLogs(log)
      this.successCallback && this.successCallback()

      return true
    } catch (error) {
      const errorMessage = `[error] ${url} is not ok | ${error}`

      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin,
      })
      this.callLogs(log)
      this.errorCallback && this.errorCallback(`${error}`)
      return false
    }
  }
}
