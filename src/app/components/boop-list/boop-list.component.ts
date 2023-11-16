import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { api } from '../../endpoints/server';
import Boop from '../../models/boop';

// TODO: filtering by id and lastModified
// TODO: filtering description with different operators
// TODO: refactor api calls
// TODO:    observable + error handling
@Component({
  selector: 'boop-list',
  templateUrl: './boop-list.component.html',
  styleUrls: ['./boop-list.component.css']
})
export class BoopListComponent implements OnChanges {
  title = 'boop-list';
  loaded: boolean = false;

  // Component identifier
  @Input() tabNum!: number;

  // Table
  displayedColumns: string[] = ['id', 'description', 'lastModified'];
  dataSource!: any;
  activeContextMenuBoopId!: number | null;

  // Sort
  @Input() sortActive!: string;
  @Input() sortDirection!: MatSort['direction'];
  @Output() changeSort: EventEmitter<{
    tabNum: number,
    sortActive: string,
    sortDirection: MatSort['direction']
  }> = new EventEmitter();

  // Paginator
  pageSizeOptions: number[] = [5, 10, 25, 50];
  resultsLength!: number;
  @Input() pageSize!: number;
  @Input() pageIndex!: number;
  @Output() changeResultsLength: EventEmitter<{
    tabNum: number,
    resultsLength: number
  }> = new EventEmitter();
  @Output() changePaginator: EventEmitter<{
    tabNum: number,
    pageSize: number,
    pageIndex: number
  }> = new EventEmitter();

  // Search
  @Input() searchValue!: string;
  @Output() searchValueChange: EventEmitter<string> = new EventEmitter();
  @Output() clearSearchValueReq: EventEmitter<number> = new EventEmitter();

  // DetailTab
  @Output() openDetailTabReq: EventEmitter<Boop> = new EventEmitter();

  @ViewChild(MatMenuTrigger) contextMenuTrigger!: MatMenuTrigger;

  // Used to position context menus
  mouseTopLeftPosX!: number;
  mouseTopLeftPosY!: number;

  constructor(private httpClient: HttpClient) { }
  
  ngOnChanges() {
    this.getBoopList();
  }

  getBoopList(): void {
    this.loaded = false;

    // TODO: better handle connection errors (snackbar with retry?)
    this.httpClient.post<any>(api.boop.filter, {
      filter: [{
        key: 'description',
        operator: 'LIKE',
        value: this.searchValue.trim()
      }],
      sort: [{
        key: this.sortActive,
        direction: this.sortDirection
      }],
      pageSize: this.pageSize,
      pageNum: this.pageIndex
    }).pipe(catchError((err: HttpErrorResponse) => {
      if(err.status === 0)
        alert('Connection error');
      
      this.loaded = true;
      return throwError(() => new Error())
    })).subscribe(data => {
      const boops: Boop[] = data.content;
      this.dataSource = new MatTableDataSource(boops);
      this.resultsLength = data.totalElements;
      this.pageIndex = data.number;
    
      this.changeResultsLength.emit({
        tabNum: this.tabNum,
        resultsLength: data.totalElements
      });

      setTimeout(() => this.loaded = true, 1000);
      // this.loaded = true;
    });

    // Mock call
    // this.httpClient.get<Boop[]>(api.mock.boop.list).subscribe(data => {
    //   const boops: Boop[] = data;
    //   this.dataSource = new MatTableDataSource(boops);
    //   this.resultsLength = data.length;

    //   this.changeResultsLength.emit({
    //     tabNum: this.tabNum,
    //     resultsLength: this.resultsLength
    //   });

    //   setTimeout(() => this.loaded = true, 1000);
    //   // this.loaded = true;
    // });
  }

  changeSearchValue(): void {
    this.searchValueChange.emit(this.searchValue);
  }

  sortChange(e: Sort): void {
    this.sortActive = e.active;
    this.sortDirection = e.direction;

    this.changeSort.emit({
      tabNum: this.tabNum,
      sortActive: e.active,
      sortDirection: e.direction
    });
  }

  paginatorChange(e: PageEvent): void {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.changePaginator.emit({
      tabNum: this.tabNum, 
      pageSize: e.pageSize,
      pageIndex: e.pageIndex
    });
  }

  clearSearchValue(): void {
    this.clearSearchValueReq.emit(this.tabNum);
  }

  openContextMenu(e: MouseEvent, boop: Boop): void {
    e.preventDefault();
    e.stopPropagation();

    this.activeContextMenuBoopId = boop.id;
    
    this.mouseTopLeftPosX = e.clientX;
    this.mouseTopLeftPosY = e.clientY;

    this.contextMenuTrigger.menuData = {boop: boop};
    this.contextMenuTrigger.openMenu();
    
    this.contextMenuTrigger.menuClosed.subscribe(() => 
      this.activeContextMenuBoopId = null
    );
  }

  openDetailTab(boop: Boop): void {
    this.openDetailTabReq.emit(boop);
  }
}
