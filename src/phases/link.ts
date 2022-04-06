import { Phase } from '.';
import { Session, Player } from '../entities'
import { LinkQuestion } from '../questions';

export class LinkPhase implements Phase {
    session: Session

    constructor(s: Session) {
        this.session = s;
    }

    start(): void {
        let lastQuestion = Array.from(this.session.players.values())
            .pop()?.questions.at(-1)?.response || "";

        for (const [key, player] of this.session.players) {
            const newLastQuestion = player.questions.at(-1)?.response || "";
            if (lastQuestion != "")
                player.ask(new LinkQuestion(lastQuestion))
            lastQuestion = newLastQuestion;

            if (lastQuestion == "")
                throw new Error("Somebody sent an empty response");
        }
    }

    finished(): boolean {
        for (var [_, player] of this.session.players) {
            if (player.questionAsked)
                return false;
        }
        return true;
    }
}