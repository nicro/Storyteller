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
    
    async createRoom(interaction: CommandInteraction, name: string) {
        var newgame = new Room();
        await newgame.init(interaction, name);
        await newgame.updateActivePlayers();
        this.rooms.push(newgame);
    }

    getSession(channelId: string): Room | undefined {
        return this.rooms.find((s: Room) => channelId == s.sysChannel?.id)
    }
}