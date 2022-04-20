import { Phase, LinkPhase } from '.'
import { GameSession, Player } from '../entities'
import { StoryQuestion } from '../questions'

export class StoryPhase implements Phase {
    session: GameSession

    constructor (session: GameSession) {
    	this.session = session;
    }

    start (): void {
    	this.session.players.forEach((p: Player) => p.ask(new StoryQuestion()));
    }

    finished (): boolean {
    	for (const [_, player] of this.session.players) {
    		if (player.questionAsked) {
                return false;
            }
    	}
    	return true;
    }

    next (): Phase {
    	return new LinkPhase(this.session);
    }
}
