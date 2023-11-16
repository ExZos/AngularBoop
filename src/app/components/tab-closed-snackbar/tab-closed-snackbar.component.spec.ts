import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabClosedSnackbarComponent } from './tab-closed-snackbar.component';

describe('TabClosedSnackbarComponent', () => {
  let component: TabClosedSnackbarComponent;
  let fixture: ComponentFixture<TabClosedSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabClosedSnackbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabClosedSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
