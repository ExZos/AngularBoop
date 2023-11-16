import { Component, inject, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface RenameTabDialogData {
  tabName: string;
}

@Component({
  selector: 'rename-tab-dialog',
  templateUrl: './rename-tab-dialog.component.html',
  styleUrls: ['./rename-tab-dialog.component.css']
})
export class RenameTabDialogComponent {
  dialogRef = inject(MatDialogRef);

  @Input() tabName: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: RenameTabDialogData) {
    this.tabName = data.tabName;
  }
}
