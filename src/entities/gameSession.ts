import { CommandInteraction, CategoryChannel, TextChannel, Message } from 'discord.js';
import { Player } from '.';

class GameSession {
    sysChannel?: TextChannel;
    chatChannel?: TextChannel;
    categoryChannel?: CategoryChannel;
    joinMessage?: Message<boolean>;

    players: Map<string, Player>;
    playersLimit: number = 5;

    constructor() {
        this.players = new Map<string, Player>();
    }

    async print_join_message() {
        this.joinMessage = await this.sysChannel?.send("Check to join!");
        await this.joinMessage?.react("✅");
        await this.update_active_players();
    }

    async create_sub_channels(interaction: CommandInteraction, name: string) {
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

    async update_active_players() {
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

    async add_player(id: string) {
        if (this.players.has(id))
            return;

        let user = await this.chatChannel?.client.users.fetch(id);
        if (!user) return;
        this.players.set(id, new Player(user));
        await this.update_active_players();
    }

    async remove_player(id: string) {
        if (!this.players.has(id))
            return;

        let user = await this.chatChannel?.client.users.fetch(id);
        if (!user) return;

        this.players.delete(id);
        await this.update_active_players();
    }
}

export {GameSession};