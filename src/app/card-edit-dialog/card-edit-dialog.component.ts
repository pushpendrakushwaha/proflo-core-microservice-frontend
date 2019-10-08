import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CardService } from '../card.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from '../models/card';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { Card } from '../models/card';

@Component({
  selector: 'app-card-edit-dialog',
  templateUrl: './card-edit-dialog.component.html',
  styleUrls: ['./card-edit-dialog.component.css']
})
export class CardEditDialogComponent implements OnInit {
  @Input() listId: string;
  @Input() boardId: string;
  @Input() cardId: string;
  @Output() commentCreated: EventEmitter<Card>;
  commentForm: FormGroup;
  commentText: string;
  // boardId: string;
  // listId: string;
 cardAssignees: FormControl;
 cardAssigneesList = ['Chaitanya', 'shifa', 'gaurav', 'sameer', 'anandra', 'pushpendra', 'vineela'];

constructor(
  private fb: FormBuilder,
  private service: CardService,
  private dialogRef: MatDialogRef<CardEditDialogComponent>,
   @Inject(MAT_DIALOG_DATA) public data:any ) {
    //this.commentText = data.commentText;
    this.cardAssignees = new FormControl();
    this.commentCreated = new EventEmitter<Card>();
  }

  ngOnInit() {
    this.commentForm = this.fb.group({
    commentText: ['', Validators.required],
    });
    console.log(this.data);
  }

  createComment() {
    if (this.commentForm.valid) {
      const comment: Card = this.commentForm.value;
      comment.cardId = this.data.cardId.cardId;
      console.log(this.data.cardId.cardId);
      this.service.createComment(this.data.cardId.cardId, comment).subscribe(t => {
        this.commentCreated.emit(comment);
      });
      this.onNoClick();
    } else {
      console.log(this.commentForm.errors);
      this.onNoClick();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
