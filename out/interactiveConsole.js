"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readLine = exports.evalFromTerminal = void 0;
const readline_1 = require("readline");
async function evalFromTerminal(_this) {
    if (process.argv.length >= 2 && (process.argv[2] === "-i" || process.argv[2] === "-il")) {
        await run.call(_this);
    }
}
exports.evalFromTerminal = evalFromTerminal;
async function run() {
    console.log("<Interactive mode>");
    const rl = (0, readline_1.createInterface)({
        input: process.stdin,
        output: process.stdout
    });
    let interactive = true;
    while (interactive) {
        await new Promise(resolve => {
            rl.question("_>", (command) => {
                if (command === "return") {
                    rl.close();
                    interactive = false;
                    return resolve();
                }
                eval(command);
                resolve();
            });
        });
    }
    console.log("<Console closed>");
}
async function readLine() {
    const rl = (0, readline_1.createInterface)({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => {
        rl.question("_>", (command) => {
            rl.close();
            return resolve(command);
        });
    });
}
exports.readLine = readLine;
//# sourceMappingURL=interactiveConsole.js.map