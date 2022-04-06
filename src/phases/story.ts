import { Phase, LinkPhase } from '.';
import { Session, Player } from '../entities'
import { StoryQuestion } from '../questions';

export class StoryPhase implements Phase {
    session: Session

    constructor(s: Session) {
        this.session = s;
    }

    start(): void {
        this.session.players.forEach((p: Player) => p.ask(new StoryQuestion()));
    }

    finished(): boolean {
        for (var [_, player] of this.session.players) {
            if (player.questionAsked)
                return false;
        }
        return true;
    }

    next(): Phase { 
        return new LinkPhase(this.session) 
    }
}