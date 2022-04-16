import { Player } from '.';
import { Phase, GoalPhase } from '../phases'

export abstract class GameSession {
    playersLimit: number
    players: Map<string, Player>
    phase: Phase

    constructor(playersNumber: number, save?: string) {
        this.playersLimit = playersNumber;
        this.players = new Map<string, Player>();
        if (save) {
            //toDo: load save and skip all phases except the latest
            this.phase = new GoalPhase(this);
        }
        else
            this.phase = new GoalPhase(this);
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
    
    toJson(): string {
        let result: string[] = [];
        this.players.forEach(player => result.push(player.toJson()));
        return `[${result.join(',')}]`;
    }

    findPlayer(id: string) {
        for (let [_, player] of this.players) {
            if (player.user.id == id)
                return player;
        }
    }
}