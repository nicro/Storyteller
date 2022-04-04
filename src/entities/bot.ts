import { GameSession, Player } from '.'
import { CommandInteraction } from 'discord.js';

class Bot {
    private static instance: Bot
    sessions: GameSession[]

    constructor() {
        this.sessions = [];
    }

    public static Instance()
    {
        return this.instance || (this.instance = new this());
    }
    
    async createRoom(interaction: CommandInteraction, name: string) {
        var newgame = new GameSession();
        await newgame.init(interaction, name);
        await newgame.printJoinMessage();
        this.sessions.push(newgame);
    }

    getSession(channelId: string): GameSession | undefined {
        return this.sessions.find((s: GameSession) => channelId == s.sysChannel?.id)
    }
}

export {Bot};