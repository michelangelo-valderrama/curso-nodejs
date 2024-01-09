import { LogDatasource } from "../../domain/datasources/log.datasource"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs"

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = "./logs"
  private readonly allLogsPath = `${this.logPath}/logs-all.log`
  private readonly mediumLogsPath = `${this.logPath}/logs-medium.log`
  private readonly highLogsPath = `${this.logPath}/logs-high.log`

  constructor() {
    this.createLogsFile()
  }

  private createLogsFile = () => {
    if (!existsSync(this.logPath)) {
      mkdirSync(this.logPath, { recursive: true })
    }

    const logFilePaths = [
      this.allLogsPath,
      this.mediumLogsPath,
      this.highLogsPath,
    ]

    logFilePaths.forEach((path) => {
      if (existsSync(path)) return
      writeFileSync(path, "")
    })
  }

  private setLogAsJSON = (log: LogEntity) => {
    return (path: string) => {
      appendFileSync(path, `${JSON.stringify(log)}\n`)
    }
  }

  async saveLog(newlog: LogEntity): Promise<void> {
    const logAsJSON = this.setLogAsJSON(newlog)

    logAsJSON(this.allLogsPath)

    if (newlog.level === LogSeverityLevel.low) return
    if (newlog.level === LogSeverityLevel.medium) {
      logAsJSON(this.mediumLogsPath)
    } else {
      logAsJSON(this.highLogsPath)
    }
  }

  private getLogsFromFile = (path: string) => {
    const content = readFileSync(path, "utf-8")
    if (content === "") return []
    const contentArr = content.split("\n")
    contentArr.pop()
    const logs = contentArr.map(LogEntity.fromJSON)
    return logs
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath)
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath)
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath)
      default:
        throw new Error(`[not implemented] ${severityLevel}`)
    }
  }
}
