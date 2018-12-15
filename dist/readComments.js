"use strict";
exports.__esModule = true;
var ts = require("typescript");
function readCommentOfFile(program, file) {
    var srcFile = program.getSourceFile(file);
    var fileComment = '';
    if (srcFile.statements.length) {
        var firstDoc = srcFile.statements[0].jsDoc;
        if (firstDoc && firstDoc.length) {
            firstDoc[0].tags.forEach(function (tag) {
                var tagName = tag.tagName.escapedText;
                if (tagName == 'file' || tagName == 'fileOverview') {
                    fileComment = tag.comment;
                }
            });
            if (!fileComment && firstDoc[0].comment) {
                fileComment = firstDoc[0].comment;
            }
        }
    }
    return fileComment;
}
exports["default"] = readCommentOfFile;
function readCommentOfTypes(program, file, typeNames) {
    var srcFile = program.getSourceFile(file);
    var checker = program.getTypeChecker();
    var symbols = checker.getSymbolsInScope(srcFile, ts.SymbolFlags.Interface).concat(checker.getSymbolsInScope(srcFile, ts.SymbolFlags.Type), checker.getSymbolsInScope(srcFile, ts.SymbolFlags.TypeAlias), checker.getSymbolsInScope(srcFile, ts.SymbolFlags.Class));
    var apiTypeInfo = [];
    symbols.forEach(function (symbol) {
        var name = symbol.getName();
        if (typeNames.indexOf(name) != -1) {
            var info = {
                name: name,
                comment: '',
                url: ''
            };
            var jsDoc = symbol.getJsDocTags();
            if (jsDoc.length) {
                var urlComments = jsDoc.filter(function (doc) {
                    return doc.name == 'url';
                });
                if (urlComments.length) {
                    info.url = urlComments[0].text;
                }
            }
            var comments = symbol.getDocumentationComment(checker);
            if (comments.length) {
                info.comment = comments[0].text;
            }
            apiTypeInfo.push(info);
        }
    });
    return apiTypeInfo;
}
exports.readCommentOfTypes = readCommentOfTypes;
function isTypeDeclare(node) {
    return node.kind === ts.SyntaxKind.InterfaceDeclaration
        || node.kind === ts.SyntaxKind.EnumDeclaration
        || node.kind === ts.SyntaxKind.TypeAliasDeclaration;
}
function getAllTypes(program, file) {
    var ret = [];
    var srcFile = program.getSourceFile(file);
    var checker = program.getTypeChecker();
    function getDocumentFromSymbol(symbol) {
        return (symbol.getDocumentationComment(checker)[0] || { text: '' }).text;
    }
    return ret;
}
exports.getAllTypes = getAllTypes;
