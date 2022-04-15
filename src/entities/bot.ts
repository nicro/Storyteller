import { Room, Player } from '.'
import { CommandInteraction } from 'discord.js';

export class Bot {
    private static instance: Bot
    rooms: Room[]

    constructor() {
        this.rooms = [];
    }

    public static Instance()
    {
        return this.instance || (this.instance = new this());
    }
    
    async createRoom(interaction: CommandInteraction, name: string, playersNumber: number) {
        var newgame = new Room(playersNumber, name);
        await newgame.init(interaction);
        await newgame.updateActivePlayers();
        this.rooms.push(newgame);
        return newgame;
    }

    getRoom(channelId: string): Room | undefined {
        return this.rooms.find((s: Room) => channelId == s.sysChannel?.id)
    }
}