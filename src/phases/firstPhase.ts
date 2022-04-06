import { Phase } from '.';
import { Session, Player } from '../entities'
import { FirstStoryQuestion } from '../questions';

export class FirstPhase implements Phase {
    session: Session

    constructor(s: Session) {
        this.session = s;
    }

    start(): void {
        this.session.players.forEach((p: Player) => p.ask(new FirstStoryQuestion()));
    }

    finished(): boolean {
        for (var [_, player] of this.session.players) {
            if (player.questionAsked)
                return false;
        }
        return true;
    }
}