import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListCard } from './models/listCard';
import { environment } from '../environments/environment';
import { MoveCardRequest } from './models/moveCardRequest';
import { Observable } from 'rxjs';
import { Card } from './models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cardId: string;
  constructor(private http: HttpClient) { }
descriptionserv: any;
  createCard(cardPayload: ListCard) {
    console.log(cardPayload);
    return this.http.post(`${environment.baseUrl}/api/cards`, cardPayload);
  }
  getdescription(description: string) {
    this.descriptionserv = description;
  }

  getCards(listId: string) {
    return this.http.get(`${environment.baseUrl}/api/lists/${listId}/cards`);
  }

  moveCard(moveCardRequest: MoveCardRequest) {
    return this.http.post(`${environment.baseUrl}/api/cards/move`, moveCardRequest);
  }
createComment(cardId: string, cardPayload: Card): Observable<any> {
    console.log(cardId, cardPayload);
    return this.http.post(`${environment.baseUrl}/api/cards/${cardId}/comment`, cardPayload);
  }
  getComment(cardId: string) {
    return this.http.get<any[]>(`${environment.baseUrl}/api/cards/${cardId}/comment`);
  }
}
