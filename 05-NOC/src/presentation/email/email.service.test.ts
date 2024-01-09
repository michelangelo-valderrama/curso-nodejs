import nodemailer from "nodemailer"
import { EmailService, SendMailOptions } from "./email.service"

describe("", () => {
  const mockSendMail = jest.fn()

  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  })

  const emailService = new EmailService()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("should send email", async () => {
    const options: SendMailOptions = {
      to: "michelangelovalderrama@gmail.com",
      subject: "Test",
      htmlBody: "<h1>Test</h1>",
    }

    await emailService.sendEmail(options)

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: options.htmlBody,
      subject: options.subject,
      to: options.to,
    })
  })

  test("should send email with attachements", async () => {
    const email = "michelangelovalderrama@gmail.com"

    await emailService.sendEmailWithFileSystemLogs(email)

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.arrayContaining([
        { filename: "logs-all.log", path: "./logs/logs-all.log" },
        { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
        { filename: "logs-high.log", path: "./logs/logs-high.log" },
      ]),
      html: expect.any(String),
      subject: "Server logs",
      to: email,
    })
  })
})
