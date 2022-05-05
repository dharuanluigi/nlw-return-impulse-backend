import { MailAdapter, SendMailData } from "../adapters/mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7bcc48392c6a93",
      pass: "333bb1d9bcd0e9"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData){
        await transport.sendMail({
            from: "Equipe feedget <oi@feedget.com>",
            to: "Dharuan Luigi <dharuanluigi@gmail.com>",
            subject,
            html: body
        });
    }
}