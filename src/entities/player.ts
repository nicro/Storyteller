import { User, MessageEmbed } from 'discord.js';
import { Question } from './../questions'

export class Player {
    user: User
    isCreator?: boolean
    questionAsked: boolean
    questions: Question[]

    constructor(user: User, isCreator?: boolean) {
        this.user = user;
        this.isCreator = isCreator;
        this.questionAsked = false;
        this.questions = [];
    }

    toJson(): string {
        return JSON.stringify({
            type: this.isCreator ? 'creator' : 'player',
            response: this.questions.at(-1)?.response || 'no response'
        });
    }

    ask(question: Question) {
        this.questions.push(question);
        if (!this.questionAsked) {
            for (let question of this.questions) {
                if (!question.isAnswered) {
                    let embed = new MessageEmbed()
                        .setColor('#0000ff')
                        .setTitle(question.get())
                        .setDescription('The next direct message to this bot will be considered as answer');
                    this.user.send({ embeds: [embed] });
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

                let embed = new MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle(feedback);

                this.user.send({ embeds: [embed] });
                if (question.isAnswered)
                    this.questionAsked = false;
            }
        }
    }
}