import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRespostory } from "../feedbacks-repository";

export class PrismaFeedbacksRespository implements FeedbacksRespostory {
    async create({type, comment, screenshot}: FeedbackCreateData) {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot
            }
        });
    }
}