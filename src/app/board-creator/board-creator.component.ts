import { Component, OnInit, Inject } from '@angular/core';
import { BoardService } from '../board.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-board-creator',
  templateUrl: './board-creator.component.html',
  styleUrls: ['./board-creator.component.css']
})
export class BoardCreatorComponent implements OnInit {

  boardForm: FormGroup;
  teamId: string;

  constructor(
    public dialogRef: MatDialogRef<BoardCreatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private boardService: BoardService) {
    this.boardForm = fb.group({
      teamId: [data.teamId, Validators.required],
      boardName: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() { }

  createBoard() {
    if (this.boardForm.valid) {
      const board: TeamBoard = this.boardForm.value;
      this.boardService.createBoard(board).subscribe(t => {
        this.dialogRef.close(t);
      });
    } else {
      console.log(this.boardForm.errors);
    }
  }
}
