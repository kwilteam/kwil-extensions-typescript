"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../src/server/builder");
function helloWorld() {
    const name = 'hello world';
    const requiredMetadata = ['!'];
    function initialize(metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            let hasRequiredMetadata = true;
            for (let key of requiredMetadata) {
                if (!metadata[key]) {
                    hasRequiredMetadata = false;
                    break;
                }
            }
            if (!hasRequiredMetadata) {
                throw new Error(`Required metadata not found: ${requiredMetadata}`);
            }
            return metadata;
        });
    }
    function sayHello(...values) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (values.length !== 1) {
                throw new Error(`Expected 1 argument, got ${values.length}`);
            }
            const name = (_a = values[0]) === null || _a === void 0 ? void 0 : _a.toString();
            if (!name) {
                throw new Error(`Expected string argument, got ${values[0]}`);
            }
            return [{ value: `Hello, ${name}!` }];
        });
    }
    function logFunction(l) {
        console.log(`log function: ${l}`);
    }
    return new builder_1.ExtensionBuilderImpl()
        .named(name)
        .withInitializer(initialize)
        .withMethods({
        sayHello
    })
        .withLoggerFn(logFunction)
        .build();
}
helloWorld();
//# sourceMappingURL=test.js.map