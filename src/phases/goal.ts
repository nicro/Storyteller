import { Phase, StoryPhase } from '.'
import { GoalQuestion } from '../questions'
import { GameSession } from '../entities'

export class GoalPhase implements Phase {
    session: GameSession

    constructor (session: GameSession) {
    	this.session = session;
    }

    start (): void {
    	this.session.getCreator().ask(new GoalQuestion());
    }

    finished (): boolean {
    	return !this.session.getCreator().questionAsked;
    }

    next (): Phase {
    	return new StoryPhase(this.session);
    }
}
