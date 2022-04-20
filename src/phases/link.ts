import { Phase, FinalPhase } from '.'
import { Player, GameSession } from '../entities'
import { LinkQuestion } from '../questions'

export class LinkPhase implements Phase {
    session: GameSession

    constructor (session: GameSession) {
    	this.session = session
    }

    start (): void {
    	const players = Array.from(this.session.players.values())
    	let lastQuestion = players.at(-1)?.questions.at(-1)?.response || ''

    	players.forEach((player: Player) => {
    		const newQuestion = player.questions.at(-1)?.response || ''
    		player.ask(new LinkQuestion(lastQuestion))
    		lastQuestion = newQuestion
    	})
    }

    finished (): boolean {
    	for (const [_, player] of this.session.players) {
    		if (player.questionAsked) { return false }
    	}
    	return true
    }

    next (): Phase {
    	return new FinalPhase(this.session)
    }
}
