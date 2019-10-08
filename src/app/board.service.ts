import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MoveListRequest } from './models/moveListRequest';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  createBoard( boardPayload) {
    return this.http.post(`${this.baseUrl}/api/boards`, boardPayload);
  }

  getBoards() {
    return this.http.get(`${this.baseUrl}/api/boards/`);
  }

  getBoard(boardId: string) {
    return this.http.get(`${this.baseUrl}/api/boards/${boardId}`);
  }

  getLists(boardId: string) {
    return this.http.get(`${this.baseUrl}/api/boards/${boardId}/lists`);
  }

  moveList(moveListRequest: MoveListRequest) {
    console.log("Moving List");
    return this.http.post(`${this.baseUrl}/api/boards/${moveListRequest.boardId}/list/move`, moveListRequest);
  }
}
