import { Question } from '.'

export class StoryQuestion implements Question {
    isAnswered: boolean = false;
    response: string = '';

    get () : string {
    	return 'Please write some story...'
    }

    consume (resp: string): string {
    	this.response = resp
    	this.isAnswered = true
    	return 'Thanks for your response'
    }

    feedback (): string {
    	if (this.isAnswered) { return 'thank you for your answer' }
    	return 'sorry, your answer does not suit the requirements'
    }
}
