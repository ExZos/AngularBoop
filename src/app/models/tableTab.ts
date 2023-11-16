import { getLocalePluralCase } from '@angular/common';
import { MatSort } from '@angular/material/sort';

import Tab from './tab';

export default class TableTab implements Tab {
    readonly DEFAULT_NAME = '';
    readonly DEFAULT_SEARCHVALUE: string = '';
    readonly DEFAULT_PAGESIZE: number = 5;
    readonly DEFAULT_PAGEINDEX: number = 0;
    readonly DEFAULT_RESULTSLENGTH: number = 0;
    readonly DEFAULT_SORTACTIVE: string = 'id';
    readonly DEFAULT_SORTDIRECTION: MatSort['direction'] = 'desc';

    readonly FALLBACK_NAME = 'New table';

    name: string;
    searchValue: string;
    pageSize: number;
    pageIndex: number;
    resultsLength: number;
    sortActive: string
    sortDirection: MatSort['direction'];
    
    constructor() {
        this.name = this.DEFAULT_NAME;
        this.searchValue = this.DEFAULT_SEARCHVALUE;
        this.pageSize = this.DEFAULT_PAGESIZE;
        this.pageIndex = this.DEFAULT_PAGEINDEX;
        this.resultsLength = this.DEFAULT_RESULTSLENGTH;
        this.sortActive = this.DEFAULT_SORTACTIVE;
        this.sortDirection = this.DEFAULT_SORTDIRECTION;
    };

    getLabel() {
        return this.name || this.searchValue || this.FALLBACK_NAME;
    }

    toString(): string {
        let str = '';

        if(this.searchValue) str += `Search: ${this.searchValue}\n`
        str += `Results: ${this.resultsLength}\n` +
            `Page: ${this.pageIndex + 1}\n` + 
            `Page size: ${this.pageSize}\n` +
            `Sorted by: ${this.sortActive}, ${this.sortDirection}` +
            ' &#8595; &#8593;';
        
        return str;
    }
}
