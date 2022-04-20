import { Player, PlayerData } from '.'
import { Phase, GoalPhase, FinalPhase } from '../phases'
import { SomeQuestion } from '../questions'

import config from '../config'
import fs from 'fs'
import path from 'path'

export abstract class GameSession {
    playersLimit: number
    players: Map<string, Player>
    phase: Phase
    save?: string

    constructor (playersNumber: number, save?: string) {
    	this.playersLimit = playersNumber
    	this.players = new Map<string, Player>()
    	if (save) {
    		this.phase = new FinalPhase(this)
    		this.save = save
    	} else { this.phase = new GoalPhase(this) }
    }

    start () {
    	if (this.save) {
            this.load(this.save);
        }
    	this.phase.start();
    }

    load (save: string) {
    	const filename = fs.readdirSync(path.resolve('./', config.SAVES_DIR))
    		.find((n: string) => n.startsWith(save));

    	if (!filename) {
    		console.log('filename not found');
    		return;
    	}

    	const saveObject: Array<PlayerData> = JSON.parse(
    		fs.readFileSync(config.SAVES_DIR + filename, 'utf8')
    	);

    	let cnt: number = 0;
    	this.players.forEach((player: Player) => {
    		if (cnt < saveObject.length) {
    			const data: PlayerData = saveObject[cnt++];
    			data.questions.forEach((s: string) => {
    				player.questions.push(new SomeQuestion(s));
    			});
    		}
    	});
    }

    serialize (): Array<PlayerData> {
    	const arr: PlayerData[] = [];
    	this.players.forEach(player => arr.push(player.serialize()));
    	return arr;
    }

    refreshProgress (): void {
    	if (this.phase?.finished()) {
    		if (this.phase.next) {
    			this.phase = this.phase.next();
    			this.phase.start();
    		}
    	}
    }

    getPlayerById (id: string): Player | undefined {
    	for (const [_, value] of this.players) {
    		if (value.user.id === id) {
                return value;
            }
    	};
    }

    getCreator (): Player {
    	for (const [_, value] of this.players) {
    		if (value.isCreator) {
                return value;
            }
    	}
    	throw new Error('no creator in a room');
    }

    findPlayer (id: string) {
    	for (const [_, player] of this.players) {
    		if (player.user.id === id) {
                return player;
            }
    	}
    }
}
