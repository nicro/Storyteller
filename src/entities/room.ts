import { CommandInteraction, CategoryChannel, TextChannel, Message, MessageEmbed } from 'discord.js';
import { Player, Session } from '.';

export class Room {
    sysChannel?: TextChannel;
    chatChannel?: TextChannel;
    categoryChannel?: CategoryChannel;
    joinMessage?: Message<boolean>;

    session: Session;

    constructor() {
        this.session = new Session();
    }

    delete() {
        this.categoryChannel?.delete();
        this.chatChannel?.delete();
        this.sysChannel?.delete();
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
        let newMessage: string = '';
        let counter: number = 0;

        this.session.players.forEach((p: Player) => {
            newMessage += `${1 + counter++}. ${p.user.username}\n`;
        });

        while (counter < this.session.playersLimit) {
            newMessage += `${1 + counter++}.\n`;
        }

        const icon: string = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b3ef4d5f-3bac-4ee3-9de2-0689c965a7b7/dd61do9-d203ed1e-22b9-4baf-9cd2-a54d3425cbaa.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IzZWY0ZDVmLTNiYWMtNGVlMy05ZGUyLTA2ODljOTY1YTdiN1wvZGQ2MWRvOS1kMjAzZWQxZS0yMmI5LTRiYWYtOWNkMi1hNTRkMzQyNWNiYWEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.bROVDaAhJB1fIf6LDm0QUsKPOszGUCEu0GH7rFys58Y';

        const embed = new MessageEmbed()
            .setColor('#c7344f')
            .setTitle('Check to join!')
            .setDescription('To start the game, the admin needs to type /start_game command!')
            .setAuthor({ name: 'Storyteller', iconURL: icon, url: 'https://discord.js.org' })
            .addField(`Active members (${this.session.players.size}/${this.session.playersLimit})`, newMessage)
            .setTimestamp();

        if (this.joinMessage) {
            return await this.joinMessage.edit({ embeds: [embed] });
        }
        this.joinMessage = await this.sysChannel?.send({ embeds: [embed] });
        return await this.joinMessage?.react("✅");
    }

    async addPlayer(id: string) {
        if (this.session.players.has(id))
            return;

        let user = await this.chatChannel?.client.users.fetch(id);
        if (!user || user.bot) return;
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