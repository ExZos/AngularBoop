import { Component, inject, Input, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

interface TabClosedSnackbarData {
  tabName: string;
}

@Component({
  selector: 'tab-closed-snackbar',
  templateUrl: './tab-closed-snackbar.component.html',
  styleUrls: ['./tab-closed-snackbar.component.css']
})
export class TabClosedSnackbarComponent {
  snackBarRef = inject(MatSnackBarRef)

  @Input() tabName: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) data: TabClosedSnackbarData) {
    this.tabName = data.tabName;
  }
}
