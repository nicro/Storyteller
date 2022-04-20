import { Room } from '.'
import { CommandInteraction } from 'discord.js'

export class Bot {
    private static instance: Bot
    rooms: Room[]

    constructor () {
    	this.rooms = [];
    }

    public static Instance () {
    	return this.instance || (this.instance = new this());
    }

    async createRoom (interaction: CommandInteraction, name: string, playersNumber: number, save?: string) {
    	const game = new Room(playersNumber, name, save);
    	await game.init(interaction);
    	await game.updateActivePlayers();
    	this.rooms.push(game);
    	return game;
    }

    getRoom (channelId: string): Room | undefined {
    	return this.rooms.find((s: Room) => channelId === s.sysChannel?.id);
    }
}
