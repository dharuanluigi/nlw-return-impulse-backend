export interface FeedbackCreateData {
    type: string;
    comment: string;
    screenshot?: string;
}

export interface FeedbacksRespostory {
    create: (data: FeedbackCreateData) => Promise<void>;
}