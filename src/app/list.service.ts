import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BoardList } from './models/boardList';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  createList(listPayload: BoardList) {
    console.log(listPayload);
    return this.http.post(`${environment.baseUrl}/api/lists`, listPayload);
  }

  getLists(boardId: string) {
    return this.http.get(`${environment.baseUrl}/api/boards/${boardId}/lists`);
  }
}
