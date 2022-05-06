import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackMock = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
    it("should be able to submit a feedback", async () => {
        await expect(submitFeedbackMock.execute({
            type: "BUG",
            comment: "some comment",
            screenshot: "data:image/png;base64,base64Code"
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it("shouldn't be able to send a feedback without type", async () => {
        await expect(submitFeedbackMock.execute({
            type: "",
            comment: "some comment",
            screenshot: "data:image/png;base64,base64Code"
        })).rejects.toThrow();

        expect(createFeedbackSpy).not.toHaveBeenCalled();
        expect(sendMailSpy).not.toHaveBeenCalled();
    });

    it("shouldn't be able to send a feedback without comment", async () => {
        await expect(submitFeedbackMock.execute({
            type: "BUG",
            comment: "",
            screenshot: "data:image/png;base64,base64Code"
        })).rejects.toThrow();
        
        expect(createFeedbackSpy).not.toHaveBeenCalled();
        expect(sendMailSpy).not.toHaveBeenCalled();
    });

    it("shouldn't be able to send a feedback with invalid image format", async () => {
        await expect(submitFeedbackMock.execute({
            type: "BUG",
            comment: "some comment",
            screenshot: "invalid format image type"
        })).rejects.toThrow();

        expect(createFeedbackSpy).not.toHaveBeenCalled();
        expect(sendMailSpy).not.toHaveBeenCalled();
    });
});