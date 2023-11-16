import Tab from './tab';

export default class OtherTab implements Tab {
    readonly DEFAULT_NAME = '';
    readonly DEFAULT_DETAILS: string = '';

    readonly FALLBACK_NAME = 'New other';

    name: string;
    details: string;

    constructor() {
        this.name = this.DEFAULT_NAME;
        this.details = this.DEFAULT_DETAILS;
    };

    getLabel() {
        return this.name || this.FALLBACK_NAME;
    }

    toString() {
        return `Details: ${this.details}`;
    }
}
