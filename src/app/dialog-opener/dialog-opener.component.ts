import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeamCreatorDialogComponent } from '../team-creator/team-creator.component';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { Location } from '@angular/common';
import { BoardCreatorComponent } from '../board-creator/board-creator.component';
import { CardEditDialogComponent } from '../card-edit-dialog/card-edit-dialog.component';

@Component({
  selector: 'app-dialog-opener',
  templateUrl: './dialog-opener.component.html',
  styleUrls: ['./dialog-opener.component.css']
})
export class DialogOpenerComponent implements OnInit {
  teamId: string;
  boardId: string;
  // listId: string;
  // cardId: string;
  constructor(private activatedRoute: ActivatedRoute, private dialog: MatDialog, private location: Location) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.teamId = params.teamid;
      this.boardId = params.boardid;
      // this.listId = params.listid;
      // this.cardId = params.cardid;
      if (this.teamId) {
        this.openBoardCreatorDialog();
      } else  {
        this.openTeamCreatorDialog();
      }
    });
  }

  openTeamCreatorDialog() {
    this.dialog.open(TeamCreatorDialogComponent, {
      width: '60vw',
      height: '80vh',
    })
    .afterClosed()
    .subscribe(data => {
      this.location.back();
    });
  }

  openBoardCreatorDialog() {
    this.dialog.open(BoardCreatorComponent, {
      data: { teamId: this.teamId },
      width: '60vw',
      height: '50vh',
    })
    .afterClosed()
    .subscribe(data => {
      this.location.back();
    });
  }
  // openCardCommentDialog() {
  //   this.dialog.open(CardEditDialogComponent, {
  //     // data: {boardId: this.boardId, listId: this.listId, cardId: this.cardId },
  //     // data: {cardId: this.cardId },
  //     width: '30vw',
  //     height: '50vh',
  //   })
  //   .afterClosed()
  //   .subscribe(data => {
  //     this.location.back();
  //   });
  // }

}
