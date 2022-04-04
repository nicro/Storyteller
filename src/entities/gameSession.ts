import { CommandInteraction, CategoryChannel, TextChannel, Message } from 'discord.js';
import { Player } from '.';
import { Phase, GoalPhase } from './../phase';

class GameSession {
    sysChannel?: TextChannel;
    chatChannel?: TextChannel;
    categoryChannel?: CategoryChannel;
    joinMessage?: Message<boolean>;

    players: Map<string, Player>;
    phase: Phase;

    playersLimit: number = 5;

    constructor() {
        this.players = new Map<string, Player>();
        this.phase = new GoalPhase(this);
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

    findPlayer(id: string) {
        for (let [_, player] of this.players) {
            if (player.user.id == id)
                return player;
        }
    }

    async printJoinMessage() {
        this.joinMessage = await this.sysChannel?.send("Check to join!");
        await this.joinMessage?.react("✅");
        await this.updateActivePlayers();
    }

    async init(interaction: CommandInteraction, name: string) {
        this.players.set(interaction.user.id, new Player(interaction.user, true));

        this.categoryChannel = await interaction.guild?.channels.create(name, {
            type: "GUILD_CATEGORY",
            permissionOverwrites: [
                {
                    id: interaction.guild.roles.everyone,
                }
            ],
        });

        this.sysChannel = await interaction.guild?.channels.create("system", {
            type: "GUILD_TEXT",
            permissionOverwrites: [
                {
                    id: interaction.guild.roles.everyone,
                    deny: ['SEND_MESSAGES'],
                }
            ],
            parent: this.categoryChannel?.id
        });

        this.chatChannel = await interaction.guild?.channels.create("chat", {
            type: "GUILD_TEXT",
            permissionOverwrites: [
                {
                    id: interaction.guild.roles.everyone,
                }
            ],
            parent: this.categoryChannel?.id
        });
    }

    async updateActivePlayers() {
        if (!this.joinMessage)
            return;

        const markLine: string = "-".repeat(20);
        let newMessage: string = `Check to join!\n\nActive members:\n` + markLine + "\n";
        let counter: number = 0;

        this.players.forEach((p: Player) => {
            newMessage += `${1 + counter++}. ${p.user.username}\n`;
        });

        while (counter < this.playersLimit) {
            newMessage += `${1 + counter++}.\n`;
        }
        newMessage += "-".repeat(20);

        await this.joinMessage.edit(newMessage)
    }

    async addPlayer(id: string) {
        if (this.players.has(id))
            return;

        let user = await this.chatChannel?.client.users.fetch(id);
        if (!user) return;
        this.players.set(id, new Player(user));
        await this.updateActivePlayers();
    }

    async removePlayer(id: string) {
        if (!this.players.has(id))
            return;

        let user = await this.chatChannel?.client.users.fetch(id);
        if (!user || this.players.get(id)?.isCreator) return;

        this.players.delete(id);
        await this.updateActivePlayers();
    }
}

export {GameSession};