import { ListCard } from './listCard';

export class BoardList {
  boardId: string;
  listTitle: string;
  listId: string;
  creationDate: Date;
  listPosition: number;
  cards: ListCard[];
}
