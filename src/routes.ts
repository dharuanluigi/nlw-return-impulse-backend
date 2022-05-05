import express from "express";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

export const routes = express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7bcc48392c6a93",
      pass: "333bb1d9bcd0e9"
    }
});

routes.post("/feedbacks", async (req, res) => {
    const {type, comment, screenshot} = req.body;

    const feedback = 

    await transport.sendMail({
        from: "Equipe feedget <oi@feedget.com>",
        to: "Dharuan Luigi <dharuanluigi@gmail.com>",
        subject: "Novo feedback",
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`,
        ].join("\n")
    });

    res.status(201).json({data: feedback})
});