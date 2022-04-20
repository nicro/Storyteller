import { Question } from '.'

export class GoalQuestion implements Question {
    isAnswered: boolean = false
    response: string = ''

    get () : string {
    	return 'Please specify the goal of the game!';
    }

    consume (resp: string): string {
    	this.response = resp;
    	this.isAnswered = true;
    	return 'Thank you for your response!';
    }

    feedback (): string {
    	if (this.isAnswered) {
            return 'Thank you for your answer!';
        }
    	return 'Sorry, your answer does not suit the requirements.';
    }
}
