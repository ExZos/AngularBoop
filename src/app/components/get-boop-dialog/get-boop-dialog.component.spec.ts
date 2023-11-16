import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBoopDialogComponent } from './get-boop-dialog.component';

describe('GetBoopDialogComponent', () => {
  let component: GetBoopDialogComponent;
  let fixture: ComponentFixture<GetBoopDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetBoopDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetBoopDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
