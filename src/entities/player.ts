import { User } from 'discord.js';
import { Question } from './../questions'

class Player {
    user: User;
    isCreator?: boolean;

    private questions: Question[];
    questionAsked: boolean = false;

    constructor(user: User, isCreator?: boolean) {
        this.user = user;
        this.isCreator = isCreator;
        this.questions = [];
    }

    ask(question: Question) {
        this.questions.push(question);
        if (!this.questionAsked) {
            for (let question of this.questions)
            {
                if (!question.isAnswered) {
                    this.user.send(question.get());
                    this.questionAsked = true;
                    break;
                }
            }
        }
    }

    handleMessage(msg: string) {
        if (!this.questionAsked)
            return;

        for (let question of this.questions) {
            if (!this.questionAsked) {
                this.user.send(question.get());
                this.questionAsked = true;
                break;
            }
            if (!question.isAnswered) {
                let feedback: string = question.consume(msg);
                this.user.send(feedback);
                if (question.isAnswered)
                    this.questionAsked = false;
            }
        }
    }
}

export {Player};