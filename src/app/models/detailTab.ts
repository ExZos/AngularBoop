import { formatDate } from '@angular/common';

import Tab from './tab';
import Boop from './boop';

export default class DetailTab implements Tab {
    readonly DEFAULT_NAME = '';

    name: string;
    boop: Boop;

    constructor(boop: Boop) {
        this.name = this.DEFAULT_NAME;
        this.boop = boop;
    };

    getLabel() {
        return this.name || '#' + this.boop.id;
    }
    
    toString() {
        return `ID: ${this.boop.id}\n` +
            `Description: ${this.boop.description}\n` +
            `Last modified: ${formatDate(this.boop.lastModified, 'dd/MM/yyyy hh:mm a', 'en')}`;
    }
}