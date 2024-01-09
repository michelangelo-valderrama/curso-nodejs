import { createTransport } from "nodemailer"
import { envs } from "../../config/plugins/envs.plugin"

export interface SendMailOptions {
  to: string | string[]
  subject: string
  htmlBody: string
  attachments?: Attachment[]
}

export interface Attachment {
  filename: string
  path: string
}

export class EmailService {
  private transporter = createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  })

  async sendEmail({
    attachments = [],
    htmlBody,
    subject,
    to,
  }: SendMailOptions): Promise<boolean> {
    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        attachments,
        html: htmlBody,
      })
      return true
    } catch (error) {
      return false
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Server logs"
    const htmlBody = `
      <h1>Hi :></h1>
      <p>Hello, world!</p>
    `
    const attachments: Attachment[] = [
      { filename: "logs-all.log", path: "./logs/logs-all.log" },
      { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
      { filename: "logs-high.log", path: "./logs/logs-high.log" },
    ]

    return this.sendEmail({
      attachments,
      htmlBody,
      subject,
      to,
    })
  }
}
