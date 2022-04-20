export interface Question {
    get(): string
    consume(resp: string): string

    isAnswered: boolean
    response: string
}
