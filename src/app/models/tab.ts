export default interface Tab {
    readonly DEFAULT_NAME: string;
    name: string;
    // [name: string]: any;
    getLabel(): void;
    toString(): string;
}
