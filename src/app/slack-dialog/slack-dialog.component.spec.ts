import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlackDialogComponent } from './slack-dialog.component';

describe('SlackDialogComponent', () => {
  let component: SlackDialogComponent;
  let fixture: ComponentFixture<SlackDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlackDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
