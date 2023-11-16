import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoopListComponent } from './boop-list.component';

describe('BoopListComponent', () => {
  let component: BoopListComponent;
  let fixture: ComponentFixture<BoopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoopListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
