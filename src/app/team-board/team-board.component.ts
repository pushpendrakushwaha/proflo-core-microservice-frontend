import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardCreatorComponent } from '../board-creator/board-creator.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-team-board',
  templateUrl: './team-board.component.html',
  styleUrls: ['./team-board.component.css']
})
export class TeamBoardComponent implements OnInit {

  boardId: string;
  boards: TeamBoard[];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.boardId = this.activatedRoute.snapshot.params.boardId;
  }

  getBoards() {

  // }this.boardService.getBoards(this.boardId).subscribe(boards => {
  //      this.boards = boards;
  //    });

   }
  }
