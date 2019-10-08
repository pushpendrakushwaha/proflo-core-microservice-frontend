export interface ListCard {
  listId: string;
  boardId: string;
  cardId: string;
  cardTitle: string;
  description: string;
  dueDate: string;
  commentId: string;
  commentText: string;
  // authoredBy?: Member[];
}
