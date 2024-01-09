import { EmailService } from "../../../../presentation/email/email.service"
import { LogEntity, LogSeverityLevel } from "../../../entities/log.entity"
import { LogRepository } from "../../../repository/log.repository"

const origin = "send-email-logs.ts"

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to)
      if (!sent) {
        throw new Error("Email log not sent")
      }
      return true
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin,
      })
      this.logRepository.saveLog(log)
      return false
    }
  }
}
