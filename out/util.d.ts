export declare function isInteger(obj: number): obj is Integer;
export declare function hasValue<T>(obj: T): obj is Exclude<typeof obj, undefined | null>;
export declare function hasProp<T>(obj: T, prop: (keyof T)[]): obj is Required<T>;
export declare function unwrap<T>(obj: T, message?: string): Exclude<T, null | undefined>;
export declare function assert(bool: boolean, msg: string): asserts bool;
export declare const stringType = "string";
export declare type Integer = number & Symbol;
export declare function makeEnumerable(obj: Object): {
    [k: string]: any;
};
export declare function JSONPrettify(json: Object | Array<any>, replacer: (key: any, value: any) => any): string;
export declare function syntaxHighlightWeb(json: string): string;
export declare function syntaxHighlightTerminal(json: string): string;
export declare function jsonAnalyze(obj: any[]): string;
export declare function initArray(arr: any[], value: any): void;
export declare function createArray(length: number): Array<any>;
export declare function download(filename: string, text: string): void;
export declare function sleep(ms: number, condition?: () => boolean, _steps?: number): Promise<void>;
export interface Option<T> {
    Err: Error;
    value?: T;
}
export declare class Queue<T> {
    private storage;
    add(el: T): void;
    get(): T | null;
}
export declare function whenAllComplete(cant: number, fun: (p: any) => any, params?: any): (force?: boolean | undefined) => boolean;
export declare function asConst<TInterface>(): <LTuple extends unknown[] | [unknown], L extends string | number | boolean, T extends WithLiterals<TInterface, L, LTuple>>(o: T) => DeepReadonly<T>;
declare type WithLiterals<T, L, LTuple> = T extends string | number | boolean | null | undefined ? T & L : {
    [P in keyof T]: WithLiterals<T[P], L, LTuple> & (T[P] extends Array<any> ? LTuple : unknown);
};
declare type DeepReadonly<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};
export declare type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
}[Keys];
export declare type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
}[Keys];
export declare function isString(obj: any): obj is string;
export declare function isObject(obj: any): obj is Object;
export {};
