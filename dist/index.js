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
var inquirer = require("inquirer");
var fs = require("fs-extra");
var readComments_1 = require("./readComments");
var settings = {
    required: true,
    ref: true,
    topRef: true
};
(function () { return __awaiter(_this, void 0, void 0, function () {
    var rootDir, basePath, testDataPath, allfile, error_1, allFilePath, program, allFileInfo, apiFile, fullPath, generator, allSymbols, apiSymbols, apiName, schema, testValue, jsonPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                rootDir = process.cwd();
                basePath = path.join(rootDir, 'api');
                testDataPath = path.join(rootDir, 'test/api');
                allfile = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fs.readdir(basePath)];
            case 2:
                allfile = _a.sent();
                ;
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                throw error_1;
            case 4:
                if (!allfile.length) {
                    console.log('api definition files cannot be found');
                    return [2 /*return*/];
                }
                allFilePath = allfile.map(function (x) { return path.join(basePath, x); });
                program = TJS.getProgramFromFiles(allFilePath, basePath);
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
            case 5:
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
                        message: 'select a status',
                        choices: apiSymbols
                    })];
            case 6:
                apiName = _a.sent();
                schema = generator.getSchemaForSymbol(apiName.apiName);
                testValue = jsf.generate(schema);
                jsonPath = path.join(testDataPath, path.basename(apiFile.apiFile, '.ts') + '.json');
                console.log('write to file', jsonPath);
                console.log(testValue);
                return [4 /*yield*/, fs.mkdirp(testDataPath)];
            case 7:
                _a.sent();
                return [4 /*yield*/, fs.writeJSON(jsonPath, testValue)];
            case 8:
                _a.sent();
                console.log('all done');
                return [2 /*return*/];
        }
    });
}); })();
