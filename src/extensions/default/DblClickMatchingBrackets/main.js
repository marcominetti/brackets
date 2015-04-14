/**
* Brackets extension to select the block inside matching brackets by double clicking a bracket.
*
* Hugo Pessotti <hpessotti@gmail.com>
**/
define(function (require, exports, module) {

	"use strict";

	var AppInit = brackets.getModule("utils/AppInit"),
		EditorManager = brackets.getModule("editor/EditorManager");

	var checkMatching = function(editor, event) {
		if (editor.doc.getSelection().match(/^[\s\[\]{}()]+$/)) {
			var matchingBracket = editor.findMatchingBracket(editor.doc.getCursor());

			if (matchingBracket && matchingBracket.match) {
				matchingBracket.from.ch += 1;
				editor.doc.setSelection(matchingBracket.from, matchingBracket.to);
			}
		}
	}

	var activeEditorChangeHandler = function ($event, focusedEditor, lostEditor) {
        if (lostEditor) {
            lostEditor._codeMirror.off("dblclick", checkMatching);
        }
        if (focusedEditor) {
            focusedEditor._codeMirror.on("dblclick", checkMatching);
        }
    };

	AppInit.appReady(function() {
		$(EditorManager).on("activeEditorChange", activeEditorChangeHandler);
	});
});
