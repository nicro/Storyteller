import { Phase, FirstPhase } from '.';
import { GameSession } from './../entities'
import { GoalQuestion } from './../questions';

export class GoalPhase implements Phase {
    session: GameSession

    constructor(s: GameSession) {
        this.session = s;
    }

    start(): void {
        this.session.getCreator().ask(new GoalQuestion());
    }

    finished(): boolean {
        return !this.session.getCreator().questionAsked
    }

    next(): Phase { 
        return new FirstPhase(this.session) 
    };
}