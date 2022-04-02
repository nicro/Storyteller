import {GameSession} from "."
import { TextChannel } from "discord.js";

class Bot {
    private static _instance: Bot
    private _sessions: GameSession[]

    constructor() {
        this._sessions = [];
    }

    public static Instance()
    {
        return this._instance || (this._instance = new this());
    }
    
    create_room(channel: TextChannel): void {
        this._sessions.push(new GameSession(channel));
    }

    get_session_by_id(channelId: string): GameSession | undefined {
        return this._sessions.find((s: GameSession) => channelId == s.get_id())
    }
}

export {Bot};