import { Room } from '.';
import { CommandInteraction } from 'discord.js';

import fs from 'fs';
import config from './../config';

export class Bot {
    private static instance: Bot
    rooms: Room[]

    constructor() {
        this.rooms = [];
    }

    public static Instance() {
        return this.instance || (this.instance = new this());
    }
    
    async loadRoom(interaction: CommandInteraction, oldName: string, newName: string, playersNumber: number) {
        const filename = fs.readdirSync(config.SAVES_DIR).find((n: string) => n.startsWith(oldName));
        if (filename) {
            const room = this.createRoom(interaction, newName, playersNumber);
        }
    }

    async createRoom(interaction: CommandInteraction, name: string, playersNumber: number, save?: string) {
        let game = new Room(playersNumber, name, save);
        await game.init(interaction);
        await game.updateActivePlayers();
        this.rooms.push(game);
        return game;
    }

    getRoom(channelId: string): Room | undefined {
        return this.rooms.find((s: Room) => channelId == s.sysChannel?.id)
    }
}