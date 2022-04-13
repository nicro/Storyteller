import {  Player } from '.'
import { Phase, GoalPhase } from '../phases';


export class Session {

    playersLimit: number = 5;
    players: Map<string, Player>;
    phase: Phase;

    constructor() {
        this.players = new Map<string, Player>();
        this.phase = new GoalPhase(this);
    }

    getPlayerById(id: string): Player | undefined {
        for (let [_, value] of this.players) {
            if (value.user.id == id)
                return value;
        }
    }

    getCreator(): Player {
        for (let [_, value] of this.players) {
            if (value.isCreator)
                return value;
        }
        throw new Error("no creator in a room");
    }

    refreshProgress(): void {
        if (this.phase?.finished())
        {
            if (this.phase.next)
            {
                this.phase = this.phase.next();
                this.phase.start();
            }
        }
    }
    
    toJson(): string {

        let result = new Map<string, string>();
        for (var [key, value] of this.players) {
            result.set(key, value.questions.at(-1)?.response || 'no response');
        }

        return JSON.stringify(Object.fromEntries(result));
    }

    findPlayer(id: string) {
        for (let [_, player] of this.players) {
            if (player.user.id == id)
                return player;
        }
    }
}