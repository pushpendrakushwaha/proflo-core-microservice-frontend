export interface MoveCardRequest {
  cardId: string
  fromListId: string
  toListId: string
  boardId: string
  fromCardPosition: number
  toCardPosition: number
}
