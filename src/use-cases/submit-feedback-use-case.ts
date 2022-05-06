import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRespostory } from "../repositories/feedbacks-repository";

interface SubmitFeedbackCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbackRespository : FeedbacksRespostory,
        private mailAdapter: MailAdapter
    ) {}
    
    async execute(request: SubmitFeedbackCaseRequest) {
        const {type, comment, screenshot} = request;

        if(!type) {
            throw new Error("Type of feedback is required.");
        }

        if(!comment) {
            throw new Error("Comment is required for the feedback.");
        }

        if(!screenshot?.startsWith("data:image/png;base64,")) {
            throw new Error("Invalid screenshot file format.");
        }

        await this.feedbackRespository.create({
            type,
            comment,
            screenshot
        });

        await this.mailAdapter.sendMail({
            subject: "Novo Feedback",
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>`,
            ].join("\n")
        });
    }
}