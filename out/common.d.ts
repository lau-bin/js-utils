export interface Option<T> {
    Err: Error;
    value?: T;
}
export declare function isEven(number: number): boolean;
export declare enum MergeOptions {
    Unset = 0,
    Skip = 1,
    Process = 2,
    Transform = 3
}
export declare function merge(source: object, dest: object, comparator?: (source_p: unknown, dest_p: unknown) => MergeOptions, transformer?: (dest_p: unknown) => unknown): void;
export declare function copyStructure(src: object, copy: object): void;
export declare function isPrimitive(val: any): boolean;
export type Primitive = string | Function | number | boolean | Symbol | undefined | null;
export type DeepTypeUnionHelper<T, R> = {
    [Key in keyof T]: T[Key] extends Primitive ? T[Key] | R : T[Key] extends unknown[] ? DeepTypeUnion<T[Key][number], R>[] : DeepTypeUnion<T[Key], R>;
};
export type DeepTypeUnion<T, R> = T extends Primitive ? T | R : DeepTypeUnionHelper<T, R>;
export type DeepTypeReplacerHelper<T, R> = {
    [Key in keyof T]: T[Key] extends Primitive ? R : T[Key] extends unknown[] ? DeepTypeReplacer<T[Key][number], R>[] : DeepTypeReplacer<T[Key], R>;
};
export type DeepTypeReplacer<T, R> = T extends Primitive ? R : DeepTypeReplacerHelper<T, R>;
export type SerializableObject = {
    [key: string | number]: SerializablePrimitives | SerializablePrimitives[] | SerializableObject | SerializableObject[];
} | SerializablePrimitives | SerializablePrimitives[];
export type SerializablePrimitives = string | number | null | undefined | boolean;
export type DeepTypeRemoverHelper<T, K> = {
    [Key in keyof T]: T[Key] extends Primitive ? T[Key] : T[Key] extends unknown[] ? DeepTypeRemover<T[Key][number], K>[] : DeepTypeRemover<Exclude<T[Key], K>, K>;
};
export type DeepTypeRemover<T, K> = T extends Primitive ? T : DeepTypeRemoverHelper<Exclude<T, K>, K>;
export type DeepTypeExchangerHelper<T, A, B> = {
    [Key in keyof T]: T[Key] extends A ? B : T[Key] extends unknown[] ? DeepTypeExchanger<T[Key][number], A, B>[] : DeepTypeExchanger<T[Key], A, B>;
};
export type DeepTypeExchanger<T, A, B> = T extends A ? B : DeepTypeExchangerHelper<T, A, B>;
export declare function packObject(serializable: SerializableObject): string;
export declare function isInteger(obj: number): obj is Integer;
export declare function hasValue<T>(obj: T): obj is Exclude<typeof obj, undefined | null>;
export declare function hasProp<T>(obj: T, prop: (keyof T)[]): obj is Required<T>;
export declare function unwrap<T>(obj: T, message?: string): Exclude<T, null | undefined>;
export declare function assert(bool: boolean, msg: string): asserts bool;
export declare const stringType = "string";
export type Integer = number & Symbol;
export declare function makeEnumerable(obj: Object): {
    [k: string]: any;
};
export declare function JSONPrettify(json: Object | Array<any>, replacer: (key: any, value: any) => any): string;
export declare function syntaxHighlightWeb(json: string): string;
export declare function syntaxHighlightTerminal(json: string): string;
export declare function jsonAnalyze(obj: any[]): string;
export declare function initArray(arr: any[], value: any): void;
export declare function createArray(length: number): Array<any>;
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
export declare function whenAllComplete(cant: number, fun: (p: any) => any, params?: any): (force?: boolean) => boolean;
export declare function asConst<TInterface>(): <LTuple extends unknown[] | [unknown], L extends string | number | boolean, T extends WithLiterals<TInterface, L, LTuple>>(o: T) => DeepReadonly<T>;
type WithLiterals<T, L, LTuple> = T extends string | number | boolean | null | undefined ? T & L : {
    [P in keyof T]: WithLiterals<T[P], L, LTuple> & (T[P] extends Array<any> ? LTuple : unknown);
};
type DeepReadonly<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
}[Keys];
export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
}[Keys];
export declare function isString(obj: any): obj is string;
export declare function isObject(obj: any): obj is Object;
export {};
