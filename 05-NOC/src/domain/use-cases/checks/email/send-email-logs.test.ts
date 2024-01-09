import { LogEntity } from "../../../entities/log.entity"
import { SendEmailLogs } from "./send-email-logs"

describe("SendEmailLogs", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  }

  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockRepository
  )

  test("should call sendEmail and not call saveLog", async () => {
    const result = await sendEmailLogs.execute(
      "michelangelovalderrama@gmail.com"
    )

    expect(result).toBe(true)
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    )
    expect(mockRepository.saveLog).not.toHaveBeenCalled()
  })

  test("should log in case of erro", async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false)

    const result = await sendEmailLogs.execute(
      "michelangelovalderrama@gmail.com"
    )

    expect(result).toBe(false)
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    )
    expect(mockRepository.saveLog).toHaveBeenCalled()
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "high",
      message: "Error: Email log not sent",
      origin: "send-email-logs.ts",
    })
  })
})
