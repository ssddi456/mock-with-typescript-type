"use strict";
exports.__esModule = true;
function default_1(program, file) {
    console.log('start !!!!');
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
exports["default"] = default_1;
