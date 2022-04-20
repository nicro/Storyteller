import { CommandInteraction, CategoryChannel, TextChannel, Message, MessageEmbed } from 'discord.js'
import { Player, GameSession } from '.'

export class Room extends GameSession {
    sysChannel?: TextChannel;
    chatChannel?: TextChannel
    categoryChannel?: CategoryChannel
    joinMessage?: Message<boolean>
    name: string

    constructor (playersNumber: number, name: string, save?: string) {
    	super(playersNumber, save);
    	this.name = name;
    }

    delete () {
    	this.categoryChannel?.delete();
    	this.chatChannel?.delete();
    	this.sysChannel?.delete();
    }

    async initCategoryChannel (handle: CommandInteraction) {
    	this.categoryChannel = await handle.guild?.channels.create(this.name, {
    		type: 'GUILD_CATEGORY',
    		permissionOverwrites: [
    			{
    				id: handle.guild.roles.everyone
    			}
    		]
    	});
    }

    async initSysChannel (handle: CommandInteraction) {
    	this.sysChannel = await handle.guild?.channels.create('system', {
    		type: 'GUILD_TEXT',
    		permissionOverwrites: [
    			{
    				id: handle.guild.roles.everyone,
    				deny: ['SEND_MESSAGES']
    			}
    		],
    		parent: this.categoryChannel?.id
    	});
    }

    async initChatChannel (handle: CommandInteraction) {
    	this.chatChannel = await handle.guild?.channels.create('chat', {
    		type: 'GUILD_TEXT',
    		permissionOverwrites: [
    			{
    				id: handle.guild.roles.everyone
    			}
    		],
    		parent: this.categoryChannel?.id
    	});
    }

    async init (handle: CommandInteraction) {
    	this.players.set(handle.user.id, new Player(handle.user, true));

    	await this.initCategoryChannel(handle);
    	await this.initSysChannel(handle);
    	await this.initChatChannel(handle);
    }

    async updateActivePlayers () {
    	let newMessage: string = '';
    	let counter: number = 0;

    	this.players.forEach((p: Player) => {
    		newMessage += `${1 + counter++}. ${p.user.username}\n`;
    	})

    	while (counter < this.playersLimit) {
    		newMessage += `${1 + counter++}.\n`;
    	}

    	const icon: string = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b3ef4d5f-3bac-4ee3-9de2-0689c965a7b7/dd61do9-d203ed1e-22b9-4baf-9cd2-a54d3425cbaa.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IzZWY0ZDVmLTNiYWMtNGVlMy05ZGUyLTA2ODljOTY1YTdiN1wvZGQ2MWRvOS1kMjAzZWQxZS0yMmI5LTRiYWYtOWNkMi1hNTRkMzQyNWNiYWEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.bROVDaAhJB1fIf6LDm0QUsKPOszGUCEu0GH7rFys58Y';

    	const embed = new MessageEmbed()
    		.setColor('#c7344f')
    		.setTitle('Check to join!')
    		.setDescription('To start the game, the admin needs to type **/start** command!')
    		.setAuthor({ name: 'Storyteller', iconURL: icon, url: 'https://discord.js.org' })
    		.addField(`Active members (${this.players.size}/${this.playersLimit})`, newMessage)
    		.setTimestamp();

    	if (this.joinMessage) {
    		return await this.joinMessage.edit({ embeds: [embed] });
    	}
    	this.joinMessage = await this.sysChannel?.send({ embeds: [embed] });
    	return await this.joinMessage?.react('✅');
    }

    async addPlayer (id: string) {
    	if (this.players.has(id)) return;

    	const user = await this.chatChannel?.client.users.fetch(id);
    	if (!user || user.bot) return;
    	this.players.set(id, new Player(user));
    	await this.updateActivePlayers();
    }

    async removePlayer (id: string) {
    	if (!this.players.has(id)) return;

    	const user = await this.chatChannel?.client.users.fetch(id);
    	if (!user || this.players.get(id)?.isCreator) return;

    	this.players.delete(id);
    	await this.updateActivePlayers();
    }
}
