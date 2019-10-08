import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCreatorComponent } from './board-creator.component';

describe('BoardCreatorComponent', () => {
  let component: BoardCreatorComponent;
  let fixture: ComponentFixture<BoardCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
