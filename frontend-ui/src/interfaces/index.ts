export interface Board {
    _id?: string,
    title: string,
    lists: List[]
}

export interface List {
    _id: string,
    title: string,
    position: number,
    cards: Card[]
}

export interface Card {
    _id?: string,
    title: string,
    position: number,
}
