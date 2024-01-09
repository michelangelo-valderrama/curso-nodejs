export const enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptionos {
  level: LogSeverityLevel
  message: string
  origin: string
  createdAt?: Date
}

export class LogEntity {
  message: string
  level: LogSeverityLevel
  createdAt: Date
  origin: string

  constructor({ level, message, origin, createdAt }: LogEntityOptionos) {
    this.level = level
    this.message = message
    this.origin = origin
    this.createdAt = createdAt ?? new Date()
  }

  static fromJSON = (json: string): LogEntity => {
    const { message, level, createdAt, origin } = JSON.parse(json)

    const log = new LogEntity({
      message,
      level,
      createdAt: new Date(createdAt),
      origin,
    })
    log.createdAt = new Date(createdAt)

    return log
  }

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = object
    return new LogEntity({
      message,
      level,
      createdAt,
      origin,
    })
  }
}
