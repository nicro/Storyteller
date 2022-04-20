import { Question } from '.'

export class SomeQuestion implements Question {
    isAnswered: boolean = true
    response: string

    constructor (response: string) {
    	this.response = response
    }

    get (): string {
    	return ''
    }

    consume (resp: string): string {
    	return ''
    }
}
