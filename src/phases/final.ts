import { MessageEmbed } from 'discord.js'
import { Phase } from '.'
import { GameSession, Player } from '../entities'

export class FinalPhase implements Phase {
    session: GameSession

    constructor (session: GameSession) {
    	this.session = session
    }

    start (): void {
    	const players = Array.from(this.session.players.values()).reverse()

    	let lastQuestion = players.at(-1)?.questions.at(-1)?.response || ''

    	players.forEach((player: Player) => {
    		const newQuestion = player.questions.at(-1)?.response || ''
    		const firstStory = player.questions.at(-2)?.response || ''

    		const embed = new MessageEmbed()
    			.setColor('#0000ff')
    			.setTitle('Your full story')
    			.setFields(
    				{ name: 'First part', value: firstStory },
    				{ name: 'Second part', value: lastQuestion }
    			)

    		player.user.send({ embeds: [embed] })

    		lastQuestion = newQuestion
    	})
    }

    finished = () => true;
}
