import { TextChannel } from "discord.js";

class GameSession {
    _channel: TextChannel;

    constructor(channel: TextChannel) {
        this._channel = channel;
        this._channel.send("Press to join!").then(msg => msg.react("✅"));
    }

    get_id(): string {
        return this._channel.id;
    }
}

export {GameSession};