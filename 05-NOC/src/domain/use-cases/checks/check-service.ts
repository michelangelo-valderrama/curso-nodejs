import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"

const origin = "check-service.ts"

export interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>
}

type SuccessCallback = () => void
type ErrorCallback = (error: string) => void

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback
  ) {}

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
      this.logRepository.saveLog(log)
      this.successCallback && this.successCallback()

      return true
    } catch (error) {
      const errorMessage = `[error] ${url} is not ok | ${error}`

      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin,
      })
      this.logRepository.saveLog(log)
      this.errorCallback && this.errorCallback(`${error}`)
      return false
    }
  }
}
