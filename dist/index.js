#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var TJS = require("typescript-json-schema");
var jsf = require("json-schema-faker");
var path = require("path");
var util = require("util");
var inquirer = require("inquirer");
var fs = require("fs-extra");
var cliProgram = require("commander");
var readComments_1 = require("./readComments");
var settings = {
    required: true,
    ref: true,
    topRef: true
};
var rootDir = process.cwd();
var basePath = path.join(rootDir, 'api');
var testDataPath = path.join(rootDir, 'test/api');
var allfile = [];
try {
    allfile = fs.readdirSync(basePath);
    ;
}
catch (error) {
    throw error;
}
var allFilePath = allfile.map(function (x) { return path.join(basePath, x); });
var program = TJS.getProgramFromFiles(allFilePath, basePath);
function selectFile() {
    return __awaiter(this, void 0, void 0, function () {
        var allFileInfo, apiFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    allFileInfo = allfile.map(function (x) {
                        var fullPath = path.join(basePath, x).replace(/\\/g, '/');
                        return {
                            name: x + ' ' + readComments_1["default"](program, fullPath),
                            value: fullPath
                        };
                    });
                    return [4 /*yield*/, inquirer.prompt({
                            type: 'list',
                            name: 'apiFile',
                            message: 'select a api file to change',
                            choices: allFileInfo
                        })];
                case 1:
                    apiFile = _a.sent();
                    return [2 /*return*/, apiFile];
            }
        });
    });
}
var listApi = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('havent implements');
        return [2 /*return*/];
    });
}); };
var mockApi = function () { return __awaiter(_this, void 0, void 0, function () {
    var apiFile, fullPath, generator, allSymbols, apiSymbols, apiName, schema, testValue, jsonPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!allfile.length) {
                    console.log('api definition files cannot be found');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, selectFile()];
            case 1:
                apiFile = _a.sent();
                fullPath = apiFile.apiFile;
                generator = TJS.buildGenerator(program, settings);
                allSymbols = generator.getMainFileSymbols(program, [fullPath]);
                apiSymbols = allSymbols.filter(function (x) { return x.match(/^Api/); });
                if (!apiSymbols.length) {
                    console.log('api definition contents cannot be found');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, inquirer.prompt({
                        type: 'list',
                        name: 'apiName',
                        message: 'select a interface',
                        choices: readComments_1.readCommentOfTypes(program, fullPath, apiSymbols).map(function (info) {
                            return {
                                name: [info.name, info.comment, info.url].filter(Boolean).join(' '),
                                value: info
                            };
                        })
                    })];
            case 2:
                apiName = _a.sent();
                schema = generator.getSchemaForSymbol(apiName.apiName.name);
                testValue = jsf.generate(schema);
                path.resolve;
                if (apiName.apiName.url) {
                    jsonPath = path.join(testDataPath, path.join('/', apiName.apiName.url + '.json'));
                }
                else {
                    jsonPath = path.join(testDataPath, path.basename(apiFile.apiFile, '.ts') + '.json');
                }
                console.log('write to file', jsonPath);
                return [4 /*yield*/, fs.mkdirp(path.dirname(jsonPath))];
            case 3:
                _a.sent();
                console.log(util.inspect(testValue));
                return [4 /*yield*/, fs.writeJSON(jsonPath, testValue, { spaces: 4 })];
            case 4:
                _a.sent();
                console.log('all done');
                return [2 /*return*/];
        }
    });
}); };
cliProgram.version('0.0.1')
    .description('')
    .option('--list', 'list type as table');
cliProgram
    .parse(process.argv);
if (cliProgram.list) {
    listApi();
}
else {
    mockApi();
}
