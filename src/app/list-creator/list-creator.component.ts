import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListService } from '../list.service';
import { Board } from '../models/board';
import { BoardList } from '../models/boardList';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list-creator',
  templateUrl: './list-creator.component.html',
  styleUrls: ['./list-creator.component.css']
})
export class ListCreatorComponent implements OnInit {
  @Input() boardId: string;
  @Output() listCreated: EventEmitter<BoardList>;
  listForm: FormGroup;

  constructor(private fb: FormBuilder, private listService: ListService) {
    this.listForm = fb.group({
      boardId: [''],
      listTitle: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.listCreated = new EventEmitter<BoardList>();
  }

  ngOnInit() {}

  createList() {
    if (this.listForm.valid) {
      const list: BoardList = this.listForm.value;
      list.boardId = this.boardId;
      console.log(list);
      this.listService.createList(list).subscribe(t => {
        this.listCreated.emit(list);
      });
    } else {
      console.log(this.listForm.errors);
    }
  }
}
