import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEditDialogComponent } from './card-edit-dialog.component';

describe('CardEditDialogComponent', () => {
  let component: CardEditDialogComponent;
  let fixture: ComponentFixture<CardEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
