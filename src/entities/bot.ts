import { GameSession } from '.'
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
    
    async create_room(interaction: CommandInteraction, name: string) {
        var newgame = new GameSession();
        await newgame.create_sub_channels(interaction, name);
        await newgame.print_join_message();
        this.sessions.push(newgame);
    }

    get_session_by_id(channelId: string): GameSession | undefined {
        return this.sessions.find((s: GameSession) => channelId == s.sysChannel?.id)
    }
}

export {Bot};