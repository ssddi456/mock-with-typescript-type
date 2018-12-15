#!/usr/bin/env node

import * as TJS from 'typescript-json-schema';
import * as jsf from 'json-schema-faker';
import * as path from 'path';
import * as util from 'util';
import * as inquirer from 'inquirer';
import * as fs from 'fs-extra';
import * as cliProgram from 'commander';
import readComments, { readCommentOfTypes, ApiTypeInfo, getAllTypes } from './readComments';

const settings: TJS.PartialArgs = {
    required: true,
    ref: true,
    topRef: true,
};

const rootDir = process.cwd();
const basePath = path.join(rootDir, 'api');
const testDataPath = path.join(rootDir, 'test/api');
let allfile: string[] = [];
try {
    allfile = fs.readdirSync(basePath);;
} catch (error) {
    throw error;
}


const allFilePath = allfile.map((x) => path.join(basePath, x));
const program = TJS.getProgramFromFiles(allFilePath, basePath);

async function selectFile() {
    const allFileInfo = allfile.map((x) => {
        const fullPath = path.join(basePath, x).replace(/\\/g, '/');
        return {
            name: x + ' ' + readComments(program, fullPath),
            value: fullPath
        };
    });

    const apiFile = await inquirer.prompt<{ apiFile: string }>({
        type: 'list',
        name: 'apiFile',
        message: 'select a api file to change',
        choices: allFileInfo
    });

    return apiFile;
}

const listApi = async (
) => {
    console.log('havent implements');
};

const mockApi = async () => {

    if (!allfile.length) {
        console.log('api definition files cannot be found');
        return;
    }

    const apiFile = await selectFile();
    const fullPath = apiFile.apiFile;
    const generator = TJS.buildGenerator(program, settings);
    const allSymbols = generator.getMainFileSymbols(program, [fullPath]);

    const apiSymbols = allSymbols.filter((x) => x.match(/^Api/));

    if (!apiSymbols.length) {
        console.log('api definition contents cannot be found');
        return;
    }

    const apiName = await inquirer.prompt<{ apiName: ApiTypeInfo }>({
        type: 'list',
        name: 'apiName',
        message: 'select a interface',
        choices: readCommentOfTypes(program, fullPath, apiSymbols).map((info) => {
            return {
                name: [info.name, info.comment, info.url].filter(Boolean).join(' '),
                value: info
            };
        })
    });

    const schema = generator.getSchemaForSymbol(apiName.apiName.name);

    const testValue = jsf.generate(schema);

    let jsonPath: string;
    path.resolve
    if (apiName.apiName.url) {
        jsonPath = path.join(testDataPath, path.join('/', apiName.apiName.url + '.json'));
    } else {
        jsonPath = path.join(testDataPath, path.basename(apiFile.apiFile, '.ts') + '.json');
    }

    console.log('write to file', jsonPath);
    await fs.mkdirp(path.dirname(jsonPath));
    console.log(util.inspect(testValue));
    await fs.writeJSON(jsonPath, testValue, { spaces: 4 });

    console.log('all done');
};


cliProgram.version('0.0.1')
    .description('')
    .option('--list', 'list type as table')

cliProgram
    .parse(process.argv);

if (cliProgram.list) {
    listApi();
} else {
    mockApi();
}


