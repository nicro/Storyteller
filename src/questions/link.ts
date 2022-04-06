import { Question } from '.';

export class LinkQuestion implements Question {

    isAnswered: boolean = false;
    response: string = "";
    prevStory: string = "";

    constructor(story: string) {
        this.prevStory = story;
    }

    get() : string {
        return "Please add some details to this story:\n" + this.prevStory;
    }

    consume(resp: string): string {
        this.response = resp;
        this.isAnswered = true;
        return 'Thanks for your response';
    }

    feedback(): string {
        if (this.isAnswered)
            return 'thank you for your answer';
        return 'sorry, your answer does not suit the requirements';
    }
}