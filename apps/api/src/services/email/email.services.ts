import { BindingScope, injectable } from '@loopback/core'
import nodemailer, { Transporter } from 'nodemailer'

@injectable({ scope: BindingScope.SINGLETON })
export class EmailService {
  private transporter: Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  async verifyConnection(): Promise<void> {
    await this.transporter.verify()
  }

  async sendEmail(options: {
    to: string
    subject: string
    html: string
    text?: string
  }): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    })
  }

  async sendQRCodeEmail(options: {
    to: string
    memberName: string
    image: string
  }): Promise<void> {
    const base64Data = options.image.split(',')[1]
    const imageBuffer = Buffer.from(base64Data, 'base64')

    await this.transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: options.to,
      subject: 'Your MemberStack QR Code',
      html: `
    <h2>MemberStack</h2>
    <p>Hello ${options.memberName},</p>
    <p>Your membership QR code is ready.</p>
    <p>Please show this QR code at the entrance for check-in.</p>
    <p>Thank you for being a valued member!</p>
    
    <img
      src="cid:memberstack-qrcode"
      alt="MemberStack QR Code"
      width="300"
      height="300"
    />

    <p>Best regards,<br/>MemberStack Team</p>
    <br/>
    <p><strong>Note:</strong> Please do not share this QR code with anyone else.</p>
    <br/>
  `,
      attachments: [
        {
          filename: 'memberstack-qrcode.png',
          content: imageBuffer,
          contentType: 'image/png',
          contentDisposition: 'inline',
          cid: 'memberstack-qrcode',
        },
      ],
    })
  }
}
