import { Component, ViewChildren, QueryList } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSort } from '@angular/material/sort';

import Boop from '../../models/boop';
import TableTab from '../../models/tableTab';
import DetailTab from '../../models/detailTab';
import OtherTab from '../../models/otherTab';
import { GetBoopDialogComponent } from '../get-boop-dialog/get-boop-dialog.component';

// TODO: center tooltip along the :
// TODO: icon for asc/desc in tab tooltip
// TODO: add more details to tab tooltip
// TODO: options button/menu
// TODO:    option to change column order
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-boop';

  // Sidenav
  sidenavOpened: boolean = true;

  // Tabs
  readonly TABLE_TAB_ID = 0;
  readonly DETAIL_TAB_ID = 1;
  readonly OTHER_TAB_ID = 2;
  tableTabs: TableTab[] = [];
  detailTabs: DetailTab[] = [];
  otherTabs: OtherTab[] = [];
  currentParentTabId: number = 0;
  currentTabNum: number = 0;

  // Detail tab
  detailTabOpen!: boolean; // Used to control the subcomponent's accordion-item expanded state

  // Context menus
  @ViewChildren(MatMenuTrigger) contextMenuTriggers!: QueryList<MatMenuTrigger>;
  private readonly ALLOW_TRIGGER_CONTEXT_MENU_CLASS: string = "mainContextMenu-triggerAllowed";
  private readonly MAIN_CONTEXT_MENU_NUM: number = 0;

  // Used to position context menus
  mouseTopLeftPosX!: number;
  mouseTopLeftPosY!: number;

  constructor(public getBoopDialog: MatDialog) { }

  openMainContextMenu(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();

    // console.log('MAIN: ', (me.target as Element).classList);
    // console.log('PARENT: ', (me.target as Element).parentElement?.classList);

    const element: Element = e.target as Element;
    if(!element.classList.contains(this.ALLOW_TRIGGER_CONTEXT_MENU_CLASS) &&
      !element.parentElement?.classList.contains(this.ALLOW_TRIGGER_CONTEXT_MENU_CLASS))
      return;

    this.mouseTopLeftPosX = e.clientX;
    this.mouseTopLeftPosY = e.clientY;

    // this.contextMenuTriggers.toArray()[this.MAIN_CONTEXT_MENU_NUM].menuData = {item: this.currentTabNum};
    this.contextMenuTriggers.toArray()[this.MAIN_CONTEXT_MENU_NUM].openMenu();
  }

  // TODO: maybe put these two functions in general spot (for both this and parent-tab)
  openRenameTabDialog(tabNum: number): void {
    alert('TODO');
  }

  closeTab(tabNum: number): void {
    alert('TODO');
  }

  /*
    Tab specific functions
  */
  getNewTableTab(): TableTab {
    return new TableTab();
  }

  getNewOtherTab(): OtherTab {
    return new OtherTab();
  }

  /*
    TableTab specific functions
  */
  changeResultsLength = (e: {tabNum: number, resultsLength: number}): void => {
    this.tableTabs[e.tabNum].resultsLength = e.resultsLength; // Only used in tooltip
    
    // console.log('resultsLength change: ', this.tabs[e.tabNum]);
  };

  changePaginator = (e: {tabNum: number, pageSize: number, pageIndex: number}): void => {
    this.tableTabs[e.tabNum].pageSize = e.pageSize;
    this.tableTabs[e.tabNum].pageIndex = e.pageIndex;

    // console.log('paginator change: ', this.tabs[e.tabNum]);
  }

  changeSort = (e: {tabNum: number, sortActive: string, sortDirection: MatSort['direction']}): void => {
    this.tableTabs[e.tabNum].sortActive = e.sortActive;
    this.tableTabs[e.tabNum].sortDirection = e.sortDirection;
    
    // console.log('sort change: ', this.tabs[e.tabNum]);
  }

  clearSearchValue = (tabNum: number): void => {
    this.tableTabs[tabNum].searchValue = '';
  }

  openDetailTab = (boop: Boop): void => {
    const tabNum: number = this.detailTabs.findIndex((t: DetailTab) => t.boop.id === boop.id);

    this.currentParentTabId = this.DETAIL_TAB_ID;

    if(tabNum === -1) {
      this.detailTabs.push(new DetailTab(boop));
      this.currentTabNum = this.detailTabs.length - 1;
    } else {
      this.currentTabNum = tabNum;
    }

    this.detailTabOpen = true;
    
    console.log('DetailTabs:', this.detailTabs);
  }

  openGetBoopDialog(): void {
    const boopDialogRef = this.getBoopDialog.open(GetBoopDialogComponent);

    boopDialogRef.afterClosed().subscribe(boop => {
      if(!boop) return;
      this.openDetailTab(boop);  
    });
  }
}