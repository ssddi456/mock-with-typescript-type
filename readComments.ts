import * as ts from 'typescript';

export default function readCommentOfFile(program: ts.Program, file: string) {
    const srcFile = program.getSourceFile(file);
    let fileComment: string | undefined = '';
    if (srcFile && srcFile.statements.length) {
        const firstDoc: ts.JSDoc[] = (srcFile.statements[0] as any).jsDoc;
        if (firstDoc && firstDoc.length) {
            if (firstDoc[0].tags) {
                firstDoc[0].tags.forEach(function (tag) {
                    const tagName = tag.tagName.escapedText;
                    if (tagName == 'file' || tagName == 'fileOverview') {
                        fileComment = tag.comment;
                    }
                });
            }
            if (!fileComment && firstDoc[0].comment) {
                fileComment = firstDoc[0].comment;
            }
        }
    }
    return fileComment || '';
}

export interface ApiTypeInfo {
    name: string,
    comment: string;
    url: string,
}

export function readCommentOfTypes(
    program: ts.Program,
    file: string,
    typeNames: string[]
): ApiTypeInfo[] {

    const srcFile = program.getSourceFile(file)!;
    const checker = program.getTypeChecker();
    const symbols = [
        ...checker.getSymbolsInScope(srcFile, ts.SymbolFlags.Interface),
        ...checker.getSymbolsInScope(srcFile, ts.SymbolFlags.Type),
        ...checker.getSymbolsInScope(srcFile, ts.SymbolFlags.TypeAlias),
        ...checker.getSymbolsInScope(srcFile, ts.SymbolFlags.Class),
    ];

    const apiTypeInfo: ApiTypeInfo[] = [];

    symbols.forEach(function (symbol) {
        const name = symbol.getName();

        if (typeNames.indexOf(name) != -1) {
            const info = {
                name,
                comment: '',
                url: ''
            };
            const jsDoc = symbol.getJsDocTags();
            if (jsDoc.length) {
                const urlComments = jsDoc.filter(function (doc) {
                    return doc.name == 'url';
                });
                if (urlComments.length) {
                    info.url = urlComments[0].text || '';
                }
            }

            const comments = symbol.getDocumentationComment(checker);
            if (comments.length) {
                info.comment = comments[0].text;
            }

            apiTypeInfo.push(info);
        }
    });

    return apiTypeInfo;
}

interface PropertyDocInfo {
    name: string;
    isRequired: boolean;
    type: string;
    desc: string;
}

interface TypeDocInfo {
    name: string;
    desc: string;
    properties: PropertyDocInfo[]
}

function isTypeDeclare(node: ts.Node): boolean {
    return node.kind === ts.SyntaxKind.InterfaceDeclaration
        || node.kind === ts.SyntaxKind.EnumDeclaration
        || node.kind === ts.SyntaxKind.TypeAliasDeclaration;

}


export function getAllTypes(
    program: ts.Program,
    file: string,
): TypeDocInfo[] {
    const ret: TypeDocInfo[] = [];

    const srcFile = program.getSourceFile(file);
    const checker = program.getTypeChecker();

    function getDocumentFromSymbol(symbol) {
        return (symbol.getDocumentationComment(checker)[0] || { text: '' }).text;
    }


    return ret;
}
