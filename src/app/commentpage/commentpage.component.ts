import { Component, OnInit } from '@angular/core';
import { Comments } from '../models/comment';
import { CardService } from '../card.service';

@Component({
  selector: 'app-commentpage',
  templateUrl: './commentpage.component.html',
  styleUrls: ['./commentpage.component.css']
})
export class CommentpageComponent implements OnInit {

  cardComments: Comments[];

  constructor(
    private service: CardService
  ) { }

  ngOnInit() {
    this.getComments(this.service.cardId);
  }

  getComments(id: string) {
    this.service.getComment(id).subscribe( (data) => {
      this.cardComments = data;
    });
  }

}
