import * as TJS from 'typescript-json-schema';
import * as ts from 'typescript';

export default function (program: ts.Program, file: string) {
    console.log('start !!!!');

    const srcFile = program.getSourceFile(file);
    let fileComment = '';
    if (srcFile.statements.length) {
        const firstDoc: ts.JSDoc[] = (srcFile.statements[0] as any).jsDoc;
        if (firstDoc && firstDoc.length) {
            firstDoc[0].tags.forEach(function (tag) {
                const tagName = tag.tagName.escapedText;
                if (tagName == 'file' || tagName == 'fileOverview') {
                    fileComment = tag.comment;
                }
            });
            if(!fileComment && firstDoc[0].comment) {
                fileComment = firstDoc[0].comment;
            }
        } 
    }
    return fileComment;
}
