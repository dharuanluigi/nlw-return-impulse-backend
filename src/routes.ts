import express from "express";
import { NodemailerMailAdapter } from "./nodemailer/nodemailer-mail-adapter";
import { PrismaFeedbacksRespository } from "./repositories/prisma/prisma-feedbacks-respository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
    const {type, comment, screenshot} = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRespository();
    const nodemailerAdapter = new NodemailerMailAdapter();
    const feedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerAdapter);

    await feedbackUseCase.execute({
        type,
        comment,
        screenshot
    });
    
    return res.status(201).send();
});