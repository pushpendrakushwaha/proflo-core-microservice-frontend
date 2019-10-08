import { Component, OnInit, Inject, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CardService } from '../card.service';
import { ListCard } from '../models/listCard';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-card-creator',
  templateUrl: './card-creator.component.html',
  styleUrls: ['./card-creator.component.css']
})
export class CardCreatorComponent implements OnInit {

  @Input() listId: string;
  @Input() boardId: string;
  // @Input() ('inviteeEmail', { static: false }) emailAddress: ElementRef;
  // @Input()('inviteeName', { static: false }) name: ElementRef;
  @Output() cardCreated: EventEmitter<ListCard>;
  cardForm: FormGroup;
  constructor(private fb: FormBuilder, private cardService: CardService, ) {
    this.cardCreated = new EventEmitter<ListCard>();
  }

  ngOnInit() {
    this.cardForm = this.fb.group({
      cardTitle: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      // invitees: fb.array([]),

    });
  }

  createCard() {
    if (this.cardForm.valid) {
      const card: ListCard = this.cardForm.value;
      card.listId = this.listId;
      card.boardId = this.boardId;
      this.cardService.createCard(card).subscribe(t => {
        this.cardCreated.emit(card);
      });
    } else {
      console.log(this.cardForm.errors);
    }
  }

  // inviteMember(name: string, emailAddress: string) {
  //   console.log('Email Address');
  //   const inviteesControl = this.cardForm.controls.invitees as FormArray;
  //   inviteesControl.push(new FormControl({memberName: name, emailId: emailAddress}));
  //   console.log(this.emailAddress);
  //   console.log(this.name);
  //   (this.emailAddress.nativeElement as HTMLInputElement).value = '';
  //   (this.name.nativeElement as HTMLInputElement).value = '';
  //   this.teamService.inviteToTeam(emailAddress).subscribe((invitedToTeam) => {
  //     console.log(invitedToTeam);
  //   });
  // }

}
