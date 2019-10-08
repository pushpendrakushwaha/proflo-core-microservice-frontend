import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCreatorDialogComponent } from './team-creator.component';

describe('TeamCreatorDialogComponent', () => {
  let component: TeamCreatorDialogComponent;
  let fixture: ComponentFixture<TeamCreatorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamCreatorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCreatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
