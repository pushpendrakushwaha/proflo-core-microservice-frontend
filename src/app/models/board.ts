import { BoardList } from './boardList';

export interface Board {
  teamId: string;
  boardName: string;
  description: string;
  BoardMembers: string[];
  BoardLists: BoardList[];
}
