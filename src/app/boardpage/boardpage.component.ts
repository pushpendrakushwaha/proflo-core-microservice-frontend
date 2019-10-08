import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListCreatorComponent } from '../list-creator/list-creator.component';
import { MatDialog, MatDialogConfig, MatDialogTitle, MatDialogModule, MatDialogRef } from '@angular/material';
import { BoardService } from '../board.service';
import { pluck } from 'rxjs/operators';
import { ListService } from '../list.service';
import { CardCreatorComponent } from '../card-creator/card-creator.component';
import { CardService } from '../card.service';
import { BoardList } from '../models/boardList';
import { Board } from '../models/board';
import { ListCard } from '../models/listCard';
import { ProfloRealTimeService } from '../proflo-realtime.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { MoveCardRequest } from '../models/moveCardRequest';
import { MoveListRequest } from '../models/moveListRequest';
import { CardEditDialogComponent } from '../card-edit-dialog/card-edit-dialog.component';
import { CommentpageComponent } from '../commentpage/commentpage.component';

@Component({
  selector: "app-boardpage",
  templateUrl: "./boardpage.component.html",
  styleUrls: ["./boardpage.component.css"],
  // providers: [MatDialogModule, MatDialogTitle, MatDialogRef]
})
export class BoardpageComponent implements OnInit {
  boardId: string;
  listId: string;
  // cardId: string;
  listMap: Map<string, BoardList>;
  // cardMap: Map<string, ListCard>;
  lists: string[];
  cards: ListCard[];
  isListCreationEnabled: boolean;
  isElevationActive: boolean;
  cardCreationEnabledFor: string;
  // cardCommentEnabledFor: string;
  board: any;

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private boardService: BoardService,
    private listService: ListService,
    private cardService: CardService,
    private profloRT: ProfloRealTimeService
  ) {
    this.isListCreationEnabled = false;
    this.cardCreationEnabledFor = null;
    // this.cardCommentEnabledFor = null;

    this.isElevationActive = true;
    this.listMap = new Map<string, BoardList>();
    this.lists = [];
  }

  ngOnInit() {
    this.profloRT.addListListener.subscribe(this.onAddList.bind(this));
    this.profloRT.addCardListener.subscribe(this.onAddCard.bind(this));
    this.profloRT.moveCardListener.subscribe(this.onMoveCard.bind(this));
    this.profloRT.moveListListener.subscribe(this.onMoveList.bind(this));
    this.activatedRoute.params.pipe(pluck("boardid")).subscribe(boardId => {
      this.boardId = boardId;
      this.profloRT.registerBoard(boardId);
      this.boardService.getBoard(boardId).subscribe((board: any) => {
        console.log(board,"getting Board");
        this.board = board;
        this.board.boardLists.forEach(list => {
          this.lists.push(list.listId);
          this.listMap.set(list.listId, list);
        });
      });
    });
  }

  onMoveList(moveListRequest: MoveListRequest) {
    console.log("moving list");
    console.log("Inside If Condition");
    this.moveList(moveListRequest);
  }

  moveList(moveListRequest: MoveListRequest) {
    if (
      this.board.boardLists[moveListRequest.toListPosition].listId !==
      moveListRequest.listId
    ) {
      var list = this.board.boardLists[moveListRequest.fromListPosition];
      this.board.boardLists.splice(moveListRequest.fromListPosition, 1);
      this.board.boardLists.splice(moveListRequest.toListPosition, 0, list);
    } else {
      console.log("Outside if");
    }
  }

  onMoveCard(moveCardRequest: MoveCardRequest) {
    console.log("Moving Card");
    var card = this.listMap
      .get(moveCardRequest.fromListId)
      .cards.splice(moveCardRequest.fromCardPosition, 1);

    this.listMap
      .get(moveCardRequest.toListId)
      .cards.splice(moveCardRequest.toCardPosition, 0, card[0]);
  }

  onAddCard(card: ListCard) {
    console.log("New Card to be added");
    console.log(card);
    this.listMap.get(card.listId).cards.push(card);
  }

  onAddList(list) {
    this.listMap[list.listId] = list;
    this.board.boardLists.push(list);
  }

  enableListCreation() {
    this.isListCreationEnabled = true;
  }

  enableCardCreation(listId) {
    console.log(listId);
    this.cardCreationEnabledFor = listId;
  }
  // enableCommentCreation(cardId) {
  //   console.log(cardId);
  //   this.cardCommentEnabledFor = cardId;
  // }

  onCardCreated() {
    this.cardCreationEnabledFor = null;
  }

  onListCreated() {
    this.isListCreationEnabled = false;
  }
  // onCommentCreated() {
  //   this.cardCommentEnabledFor = null;
  // }

  listOpenDialog(): void {
    const dialogRef = this.dialog.open(ListCreatorComponent, {
      data: { boardId: this.boardId }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(result);
    });
  }

  cardOpenDialog(): void {
    const dialogRef = this.dialog.open(CardCreatorComponent, {
      data: { boardId: this.boardId }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(result);
    });
  }

  onListDrop(event: CdkDragDrop<string[]>) {
    console.log("On List Drop");
    const listId = this.board.boardLists[event.previousIndex].listId;
    const moveListRequest: MoveListRequest = {
      listId,
      boardId: this.boardId,
      fromListPosition: event.previousIndex,
      toListPosition: event.currentIndex
    };
    this.moveList(moveListRequest);
    this.boardService.moveList(moveListRequest).subscribe(data => {
      console.log(data);
    });
  }

  onCardDrop(event: CdkDragDrop<string[]>) {
    console.log(this.listMap.get(event.previousContainer.id));
    const cardId = this.listMap.get(event.previousContainer.id).cards[
      event.previousIndex
    ].cardId;
    const moveCardRequest: MoveCardRequest = {
      cardId,
      boardId: this.boardId,
      fromListId: event.previousContainer.id,
      toListId: event.container.id,
      fromCardPosition: event.previousIndex,
      toCardPosition: event.currentIndex
    };
    this.cardService.moveCard(moveCardRequest).subscribe(data => {
      console.log(data);
    });
  }
  OnClickCard(cardDetails): void {
    const dialogRef = this.dialog.open(CardEditDialogComponent, {
      width: '300px',
      height: '300px',
      data: {
        cardId: cardDetails
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Card Dialog');
    });
  }
  onCommentsClick(id: string): void {
    this.cardService.cardId = id;
    const dialogRef = this.dialog.open(CommentpageComponent, {
      width: '300px',
      height: '300px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Card Comment Dialog');
    });
  }
  getBoardId(id: string) {
    {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = id;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    }
  }

  getListId(id: string) {
    {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = id;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    }
  }



  // OnClickCard() {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.data = {
  //     cardId: '5d92f067be4d9700016f4999',
  //   };
  //   this.dialog.open(CardEditDialogComponent, dialogConfig);
  // }
}

