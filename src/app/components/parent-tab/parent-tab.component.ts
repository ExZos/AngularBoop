import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';

import Tab from 'src/app/models/tab';
import { RenameTabDialogComponent } from '../rename-tab-dialog/rename-tab-dialog.component';
import { TabClosedSnackbarComponent } from '../tab-closed-snackbar/tab-closed-snackbar.component';

@Component({
  selector: 'parent-tab',
  templateUrl: './parent-tab.component.html',
  styleUrls: ['./parent-tab.component.css']
})
export class ParentTabComponent implements OnInit {
  @Input() tabName!: string;
  @Input() parentTabId!: number;
  @Input() tabs!: Tab[];
  @Input() currentParentTabId!: number;
  @Input() currentTabNum!: number;
  @Input() newTab!: Tab; // Used when adding tabs using the add button, the add button is hidden when this is null
  @Input() tabOpen!: boolean // Not necessary, only for controlling accordion-item expanded state in parent

  @Output() currentParentTabIdChange: EventEmitter<number> = new EventEmitter();
  @Output() currentTabNumChange: EventEmitter<number> = new EventEmitter();
  @Output() tabOpenChange: EventEmitter<boolean> = new EventEmitter();
  @Output() openSearchDialogReq: EventEmitter<void> = new EventEmitter(); // Used to add tabs via an id search

  @ViewChild(MatMenuTrigger) contextMenuTrigger!: MatMenuTrigger;

  // Used to position context menus
  mouseTopLeftPosX!: number;
  mouseTopLeftPosY!: number;

  activeContextMenuTabNum!: number | null;

  constructor(public renameTabDialog: MatDialog, public tabClosedSnackbar: MatSnackBar) { }

  ngOnInit(): void {
    if(this.currentParentTabId === this.parentTabId && this.newTab) this.tabs.push(this.newTab);
  }

  changeTabOpen(open: boolean): void {
    this.tabOpenChange.emit(open);
  }

  getParentTabTooltip(): string {
    if(this.tabs.length == 0) return 'No tabs';
    else if(this.tabs.length == 1) return '1 tab';
    
    return this.tabs.length + ' tabs';
  }

  moveTab(e: CdkDragDrop<Tab[]>): void {
    moveItemInArray(this.tabs, e.previousIndex, e.currentIndex);
    
    if(this.currentTabNum === e.previousIndex) this.currentTabNumChange.emit(e.currentIndex);
    else if(this.currentTabNum <= e.currentIndex && this.currentTabNum > e.previousIndex) this.currentTabNumChange.emit(this.currentTabNum - 1);
    else if(this.currentTabNum >= e.currentIndex && this.currentTabNum < e.previousIndex) this.currentTabNumChange.emit(this.currentTabNum + 1);
  }

  addTab(): void {
    if(!this.newTab)
      return;
    
    this.tabs.push(this.newTab);
    
    this.currentParentTabIdChange.emit(this.parentTabId);
    this.currentTabNumChange.emit(this.tabs.length - 1);
    
    console.log(`T#${this.parentTabId}:`, this.tabs);
  }

  getTabTooltip = (tabNum: number): string => {
    return this.tabs[tabNum].toString();
  }

  openSearchDialog(): void {
    this.openSearchDialogReq.emit();
  }

  openContextMenu(e: MouseEvent, tabNum: number): void {
    e.preventDefault();
    e.stopPropagation();

    this.activeContextMenuTabNum = tabNum;
    
    this.mouseTopLeftPosX = e.clientX;
    this.mouseTopLeftPosY = e.clientY;

    this.contextMenuTrigger.menuData = {tabNum: tabNum};
    this.contextMenuTrigger.openMenu();

    this.contextMenuTrigger.menuClosed.subscribe(() => 
      this.activeContextMenuTabNum = null
    );
  }

  changeTab(tabNum: number): void {
    this.currentParentTabIdChange.emit(this.parentTabId);
    this.currentTabNumChange.emit(tabNum);
  }

  renameTab = (tabNum: number, tabName: string): void => {
    this.tabs[tabNum].name = tabName.trim();

    this.renameTabDialog.closeAll();
  }

  openRenameTabDialog(tabNum: number): void {
    const renameTabDialogRef = this.renameTabDialog.open(RenameTabDialogComponent, {
      data: { tabName: this.tabs[tabNum].name }
    });
    
    renameTabDialogRef.afterClosed().subscribe(tabName => {
      if(!tabName.trim()) return;
      this.renameTab(tabNum, tabName)
    });
  }

  closeTab(tabNum: number): void {
    let currentTabNumMod = 0; // Retain current tab number modifications for undo
    if((tabNum === this.currentTabNum && tabNum != 0) || tabNum < this.currentTabNum) {
      currentTabNumMod--;
      this.currentTabNumChange.emit(this.currentTabNum - 1);
    }

    const closedTab = this.tabs[tabNum]; // Retain closed tab for undo
    this.tabs.splice(tabNum, 1);

    // Open snackbar with action to undo close tab
    const tabClosedSnackbarRef = this.tabClosedSnackbar.openFromComponent(TabClosedSnackbarComponent, {
      duration: 3000,
      data: { tabName: closedTab.getLabel() }
    });
    
    tabClosedSnackbarRef.onAction().subscribe(() => 
      this.undoCloseTab(tabNum, currentTabNumMod, closedTab)
    );
  }

  undoCloseTab = (tabNum: number, currentTabNumMod: number, closedTab: Tab): void => {
    this.tabs.splice(tabNum, 0, closedTab);
    this.currentTabNumChange.emit(this.currentTabNum - currentTabNumMod);
    this.tabClosedSnackbar.dismiss();
  }
}
