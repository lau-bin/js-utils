export function isEven(number) {
    // true if par
    if ((number & 1) == 0) {
        return true;
    }
    return false;
}
export var MergeOptions;
(function (MergeOptions) {
    MergeOptions[MergeOptions["Unset"] = 0] = "Unset";
    MergeOptions[MergeOptions["Skip"] = 1] = "Skip";
    MergeOptions[MergeOptions["Process"] = 2] = "Process";
    MergeOptions[MergeOptions["Transform"] = 3] = "Transform";
})(MergeOptions || (MergeOptions = {}));
// mutates dest object, common properties pass through the comparator where return of type false unsets it and true overrides it on dest.
export function merge(source, dest, comparator, transformer) {
    Object.keys(source).forEach(k => {
        if (Object.hasOwn(dest, k)) {
            let res = comparator ? comparator(source[k], dest[k]) : MergeOptions.Process;
            if (res == MergeOptions.Process) {
                if (isPrimitive(dest[k]) || isPrimitive(source[k])) {
                    if (transformer) {
                        dest[k] = transformer(source[k]);
                    }
                    else {
                        dest[k] = source[k];
                    }
                }
                else {
                    merge(source[k], dest[k], comparator);
                }
            }
            else if (res == MergeOptions.Unset) {
                delete dest[k];
            }
            else if (res == MergeOptions.Transform && transformer) {
                dest[k] = transformer(dest[k]);
            }
        }
    });
}
//makes a clone of src object but all primitive values are undefined including array contents
export function copyStructure(src, copy) {
    Object.keys(src).forEach(p => {
        if (isPrimitive(src[p])) {
            if (Array.isArray(src[p])) {
                copy[p] = [];
                copy[p].length = src[p].length;
                copyStructure(src[p], copy[p]);
            }
            else {
                copy[p] = undefined;
            }
        }
        else {
            copy[p] = {};
            copyStructure(src[p], copy[p]);
        }
    });
}
export function isPrimitive(val) {
    if (val === null) {
        return true;
    }
    if (typeof val == "object" || typeof val == "function") {
        return false;
    }
    else {
        return true;
    }
}
export function packObject(serializable) {
    return JSON.stringify(serializable);
}
export function isInteger(obj) {
    if (obj % 1 > 0) {
        return false;
    }
    else {
        return true;
    }
}
export function hasValue(obj) {
    if (obj == null || obj === undefined) {
        return false;
    }
    else {
        return true;
    }
}
export function hasProp(obj, prop) {
    for (let i = 0; i < prop.length; i++) {
        if (obj[prop[i]] === undefined) {
            return false;
        }
    }
    return true;
}
export function unwrap(obj, message) {
    if (hasValue(obj)) {
        return obj;
    }
    else {
        throw new Error(message || "Value not present");
    }
}
export function assert(bool, msg) {
    if (!bool)
        throw new Error(msg);
}
export const stringType = "string";
export function makeEnumerable(obj) {
    return Object.fromEntries(
    //@ts-ignore
    Object.getOwnPropertyNames(obj).map(prop => [prop, obj[prop]]));
}
export function JSONPrettify(json, replacer) {
    let result = JSON.stringify(json, replacer, 2);
    // let height = (result.match(/\n/g) || []).length;
    result = result.replace(/: null/g, ": --").replace(/\"/g, "");
    return result;
}
export function syntaxHighlightWeb(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            }
            else {
                cls = 'string';
            }
        }
        else if (/true|false/.test(match)) {
            cls = 'boolean';
        }
        else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
export function syntaxHighlightTerminal(json) {
    if (typeof json !== 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = "\x1b[36m";
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = "\x1b[34m";
            }
            else {
                cls = "\x1b[32m";
            }
        }
        else if (/true|false/.test(match)) {
            cls = "\x1b[35m";
        }
        else if (/null/.test(match)) {
            cls = "\x1b[31m";
        }
        return cls + match + "\x1b[0m";
    });
}
export function jsonAnalyze(obj) {
    let arr = [];
    analyzeJson(obj, null, arr);
    return logBeautifiedDotNotation(arr);
    function analyzeJson(obj, parentStr, outArr) {
        let opt;
        if (!outArr) {
            return "no output array given";
        }
        for (let prop in obj) {
            opt = parentStr ? parentStr + '.' + prop : prop;
            if (Array.isArray(obj[prop]) && obj[prop] !== null) {
                let arr = obj[prop];
                if ((Array.isArray(arr[0]) || typeof arr[0] == "object") && arr[0] != null) {
                    outArr.push(opt + '[]');
                    analyzeJson(arr[0], opt + '[]', outArr);
                }
                else {
                    outArr.push(opt + '[]');
                }
            }
            else if (typeof obj[prop] == "object" && obj[prop] !== null) {
                outArr.push(opt + '{}');
                analyzeJson(obj[prop], opt + '{}', outArr);
            }
            else {
                if (obj.hasOwnProperty(prop) && typeof obj[prop] != 'function') {
                    outArr.push(opt);
                }
            }
        }
    }
    function logBeautifiedDotNotation(arr) {
        let retStr = '';
        arr.map(function (item) {
            let dotsAmount = item.split(".").length - 1;
            let dotsString = Array(dotsAmount + 1).join('    ');
            retStr += dotsString + item + '\n';
            console.log(dotsString + item);
        });
        return retStr;
    }
}
export function initArray(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = value;
    }
}
export function createArray(length) {
    var arr = new Array(length || 0), i = length;
    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        //@ts-ignore
        while (i--)
            arr[length - 1 - i] = createArray.apply(this, args);
    }
    return arr;
}
// zzz
export async function sleep(ms, condition, _steps) {
    let sleeptMs = 0;
    let steps = _steps || 100;
    while (sleeptMs < ms) {
        await new Promise(resolve => setTimeout(resolve, steps));
        if (condition && condition() == false) {
            break;
        }
        sleeptMs += steps;
    }
}
export class Queue {
    storage = [];
    add(el) {
        this.storage.push(el);
    }
    get() {
        let el = this.storage.shift();
        if (el == undefined) {
            return null;
        }
        return el;
    }
}
export function whenAllComplete(cant, fun, params) {
    let counter = cant;
    return function (force) {
        counter--;
        if (counter == 0 || force) {
            fun(params);
            counter = -1;
            return true;
        }
        else if (counter > 0) {
            return false;
        }
        else {
            return true;
        }
    };
}
export function asConst() {
    return function (o) {
        return o;
    };
}
export function isString(obj) {
    return (typeof obj == 'string') || (obj instanceof String);
}
export function isObject(obj) {
    return (typeof obj == 'object') || (obj instanceof Object);
}
//# sourceMappingURL=common.js.map