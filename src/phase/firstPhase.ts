import { Phase } from '.';
import { GameSession, Player } from './../entities'
import { FirstStoryQuestion } from './../questions';

export class FirstPhase implements Phase {
    session: GameSession

    constructor(s: GameSession) {
        this.session = s;
    }

    start(): void {
        console.log('first phrase executed');
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