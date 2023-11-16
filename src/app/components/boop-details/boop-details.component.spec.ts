import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoopDetailsComponent } from './boop-details.component';

describe('BoopDetailsComponent', () => {
  let component: BoopDetailsComponent;
  let fixture: ComponentFixture<BoopDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoopDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoopDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
