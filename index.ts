export function isInteger(obj: number): obj is Integer {
  if (obj % 1 > 0) {
    return false;
  }
  else {
    return true;
  }
}

export function hasValue<T>(obj: T): obj is Exclude<typeof obj, undefined | null> {
  if (obj == null || obj === undefined) {
    return false;
  }
  else {
    return true;
  }
}

export function hasProp<T>(obj: T, prop: (keyof T)[]): obj is Required<T> {
  for (let i = 0; i < prop.length; i++){
    if (obj[prop[i]] === undefined){
      return false
    }
  }
  return true
}

export function unwrap<T>(obj: T, message?: string) {
  if (hasValue(obj)) {
    return obj;
  }
  else {
    throw new Error(message || "Value not present");
  }
}

export function assert(bool: boolean, msg: string): asserts bool {
  if (!bool) throw new Error(msg)
}

export const stringType = "string";

export type Integer = number & Symbol

export function makeEnumerable(obj: Object) {
  return Object.fromEntries(
    //@ts-ignore
    Object.getOwnPropertyNames(obj).map(prop => [prop, obj[prop]])
  )
}

export function JSONPrettify(json: Object | Array<any>, replacer: (key:any, value:any)=>any) {
  let result = JSON.stringify(json, replacer, 2);
  // let height = (result.match(/\n/g) || []).length;
  result = result.replace(/: null/g, ": --").replace(/\"/g, "");
  return result;
}


export function syntaxHighlightWeb(json: string) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'key';
          } else {
              cls = 'string';
          }
      } else if (/true|false/.test(match)) {
          cls = 'boolean';
      } else if (/null/.test(match)) {
          cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
  });
}
export function syntaxHighlightTerminal(json: string) {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, undefined, 2);
  }
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, 
    function (match) {
      let cls = "\x1b[36m";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "\x1b[34m";
        } else {
          cls = "\x1b[32m";
        }
      } else if (/true|false/.test(match)) {
        cls = "\x1b[35m"; 
      } else if (/null/.test(match)) {
        cls = "\x1b[31m";
      }
      return cls + match + "\x1b[0m";
    }
  );
}
export function jsonAnalyze(obj: any[]) {
  let arr: string[] = [];
  analyzeJson(obj, null, arr);
  return logBeautifiedDotNotation(arr);

function analyzeJson(obj: any , parentStr: string | null, outArr: string[]) {
  let opt;
  if (!outArr) {
      return "no output array given"
  }
  for (let prop in obj) {
      opt = parentStr ? parentStr + '.' + prop : prop;
      if (Array.isArray(obj[prop]) && obj[prop] !== null) {
              let arr = obj[prop];
          if ((Array.isArray(arr[0]) || typeof arr[0] == "object") && arr[0] != null) {                        
              outArr.push(opt + '[]');
              analyzeJson(arr[0], opt + '[]', outArr);
          } else {
              outArr.push(opt + '[]');
          }
      } else if (typeof obj[prop] == "object" && obj[prop] !== null) {
              outArr.push(opt + '{}');
              analyzeJson(obj[prop], opt + '{}', outArr);
      } else {
          if (obj.hasOwnProperty(prop) && typeof obj[prop] != 'function') {
              outArr.push(opt);
          }
      }
  }
}

function logBeautifiedDotNotation(arr: string[]) {
  let retStr = '';
  arr.map(function (item) {
      let dotsAmount = item.split(".").length - 1;
      let dotsString = Array(dotsAmount + 1).join('    ');
      retStr += dotsString + item + '\n';
      console.log(dotsString + item)
  });
  return retStr;
}
}



// export function jfor(times: number, func: (index?: number) => JSX.Element): Array<JSX.Element> {
//   return ([...Array(times)].map((e, i) => func(i)));
// }

export function initArray(arr: any[], value: any) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = value;
  }
}
export function createArray(length: number): Array<any> {
  var arr = new Array(length || 0),
    i = length;


  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    //@ts-ignore
    while (i--) arr[length - 1 - i] = createArray.apply(this, args);
  }

  return arr;
}

export function download(filename: string, text: string) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// zzz
export async function sleep(ms: number, condition?: ()=>boolean, _steps?: number): Promise<void> {
  let sleeptMs = 0
  let steps = _steps || 100
  while (sleeptMs < ms){
    await new Promise(resolve => setTimeout(resolve, steps))
    if (condition && condition() == false){
      break
    }
    sleeptMs += steps
  }
}

export interface Option<T> {
  Err: Error,
  value?: T
}

export class Queue<T>{
  private storage: T[] = []

  add(el: T) {
    this.storage.push(el)
  }
  get(): T | null{
    let el = this.storage.shift()
    if (el == undefined){
      return null
    }
    return el
  }
}

export function whenAllComplete(cant: number, fun: (p:any)=>any, params?: any){
  let counter = cant
  return function (force?: boolean){
    counter--
    if (counter == 0 || force){
      fun(params)
      counter = -1
      return true
    }
    else if (counter > 0){
      return false
    }
    else{
      return true
    }
  }
}


export function asConst<TInterface>()
{
    return function<
        LTuple extends [unknown] | unknown[],
        L extends string | boolean | number, T extends WithLiterals<TInterface, L, LTuple>>(o: T): DeepReadonly<T> {
        return o as any
    }
}
type WithLiterals<T, L, LTuple> =  
    T extends string| number | boolean | null | undefined ? T & L :
    {
        [P in keyof T]: 
            WithLiterals<T[P], L, LTuple> & (T[P] extends Array<any> ? LTuple: unknown)
    }

type DeepReadonly<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>
}

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>> 
    & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
        [K in Keys]-?:
            Required<Pick<T, K>>
            & Partial<Record<Exclude<Keys, K>, undefined>>
    }[Keys]


export function isString(obj: any): obj is string{
  return (typeof obj == 'string') || (obj instanceof String)
}
export function isObject(obj: any): obj is Object{
  return (typeof obj == 'object') || (obj instanceof Object)
}
