import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnection, HubConnectionState } from '@aspnet/signalr';
import { BehaviorSubject, Subject } from 'rxjs';
import { Board } from './models/board';
import { BoardList } from './models/boardList';
import { ListCard } from './models/listCard';
import { environment } from '../environments/environment';
import { MoveCardRequest } from './models/moveCardRequest';
import { MoveListRequest } from './models/moveListRequest';
@Injectable({
  providedIn: 'root'
})
export class ProfloRealTimeService {
  hubConnection: HubConnection;
  addBoardListener = new Subject<Board>();
  addListListener = new Subject<BoardList>();
  addCardListener = new Subject<ListCard>();
  moveCardListener = new Subject<MoveCardRequest>();
  moveListListener = new Subject<MoveListRequest>();

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.baseUrl}/proflo`)
      .build();
    this.hubConnection.on('BoardAdded', this.notifyBoardAdded.bind(this));
    this.hubConnection.on('ListAdded', this.notifyListAdded.bind(this));
    this.hubConnection.on('CardAdded', this.notifyCardAdded.bind(this));
    this.hubConnection.on('CardMoved', this.notifyCardMoved.bind(this));
    this.hubConnection.on('ListMoved', this.notifyListMoved.bind(this));
    this.hubConnection.onclose((err) => {
      console.log(err);
      this.initializeConnection();
    });
    // this.initializeConnection();
  }

  initializeConnection() {
    if (this.hubConnection.state !== HubConnectionState.Connected) {
      console.log("starting connection");
      return this.hubConnection.start();
    }
  }

  notifyListMoved(moveListRequest: MoveListRequest) {
    this.moveListListener.next(moveListRequest);
  }

  notifyCardMoved(moveCardRequest: MoveCardRequest) {
    console.log(this.notifyCardMoved);
    this.moveCardListener.next(moveCardRequest);
  }

  notifyBoardAdded(board: Board) {
    this.addBoardListener.next(board);
  }

  registerBoard(boardId: string) {
    if (this.hubConnection.state === HubConnectionState.Disconnected) {
      return this.hubConnection.start()
        .then(() => {
          console.log("initialize in if");
          this.hubConnection.invoke("Initialize", boardId);
        });
    } else {
      console.log("initialize in else");
      this.hubConnection.invoke("Initialize", boardId);
    }
  }

  notifyListAdded(list: BoardList) {
    this.addListListener.next(list);
  }

  notifyCardAdded(card: ListCard) {
    this.addCardListener.next(card);
  }

}
