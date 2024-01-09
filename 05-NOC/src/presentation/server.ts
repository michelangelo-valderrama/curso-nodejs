import { CheckService } from "../domain/use-cases/checks/check-service"
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple"
import { SendEmailLogs } from "../domain/use-cases/checks/email/send-email-logs"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource"
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron.service"
import { EmailService } from "./email/email.service"

// Dependencias
const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource())
const postgresLogRepository = new LogRepositoryImpl(new PostgresLogDatasource())

const emailService = new EmailService()

export class Server {
  static start() {
    console.log("[server] started...")

    // send email
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(
    //   "michelangelovalderrama@gmail.com"
    // )

    const url = "https://google.com"
    CronService.createJob("*/5 * * * * *", () => {
      // new CheckService(
      //   logRepository // Injección de Dependencia
      // ).execute(url)
      new CheckServiceMultiple(
        [fileSystemLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`${url} is ok`),
        (e) => console.error(`error ${e}`)
      ).execute(url)
    })
  }
}
