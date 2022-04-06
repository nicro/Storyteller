import { CommandInteraction, CategoryChannel, TextChannel, Message } from 'discord.js';
import { Player, Session } from '.';

class Room {
    sysChannel?: TextChannel;
    chatChannel?: TextChannel;
    categoryChannel?: CategoryChannel;
    joinMessage?: Message<boolean>;

    session: Session;

    constructor() {
        this.session = new Session();
    }

    async printJoinMessage() {
        this.joinMessage = await this.sysChannel?.send("Check to join!");
        await this.joinMessage?.react("✅");
        await this.updateActivePlayers();
    }

    async init(interaction: CommandInteraction, name: string) {
        this.session.players.set(interaction.user.id, new Player(interaction.user, true));

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

        this.session.players.forEach((p: Player) => {
            newMessage += `${1 + counter++}. ${p.user.username}\n`;
        });

        while (counter < this.session.playersLimit) {
            newMessage += `${1 + counter++}.\n`;
        }
        newMessage += "-".repeat(20);

        await this.joinMessage.edit(newMessage)
    }

    async addPlayer(id: string) {
        if (this.session.players.has(id))
            return;

        let user = await this.chatChannel?.client.users.fetch(id);
        if (!user) return;
        this.session.players.set(id, new Player(user));
        await this.updateActivePlayers();
    }

    async removePlayer(id: string) {
        if (!this.session.players.has(id))
            return;

        let user = await this.chatChannel?.client.users.fetch(id);
        if (!user || this.session.players.get(id)?.isCreator) return;

        this.session.players.delete(id);
        await this.updateActivePlayers();
    }
}

export {Room};