/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    'use strict';

    // The CommandManager registers command IDs with functions
    var CommandManager = brackets.getModule("command/CommandManager"),
        // This will let us add menus items
        Menus          = brackets.getModule("command/Menus"),
        EditorManager = brackets.getModule("editor/EditorManager"),
        DocumentManager = brackets.getModule("document/DocumentManager"),
        Commands = brackets.getModule("command/Commands");


    /*
        Some constants used by Additional right click menu       
    */
    var RIGHT_CLICK_MENU_COPY_NAME   = "Copy",
        RIGHT_CLICK_MENU_COPY_COMMAND_ID  = "rightclickmenu.copy",
        RIGHT_CLICK_MENU_PASTE_NAME   = "Paste",
        RIGHT_CLICK_MENU_PASTE_COMMAND_ID  = "rightclickmenu.paste",
        RIGHT_CLICK_MENU_CUT_NAME   = "Cut",
        RIGHT_CLICK_MENU_CUT_COMMAND_ID  = "rightclickmenu.cut",
        RIGHT_CLICK_MENU_UPPERCASE_NAME   = "UPPERCASE",
        RIGHT_CLICK_MENU_UPPERCASE_COMMAND_ID  = "rightclickmenu.uppercase",
        RIGHT_CLICK_MENU_LOWERCASE_NAME   = "lowercase",
        RIGHT_CLICK_MENU_LOWERCASE_COMMAND_ID  = "rightclickmenu.lowercase",
        RIGHT_CLICK_MENU_SELECTALL_NAME   = "Select all",
        RIGHT_CLICK_MENU_SELECTALL_COMMAND_ID  = "rightclickmenu.selectall",
        RIGHT_CLICK_MENU_BLOCKCOMMENT_NAME   = "Toggle Block Comment",
        RIGHT_CLICK_MENU_BLOCKCOMMENT_COMMAND_ID  = "rightclickmenu.blockComment",
        RIGHT_CLICK_MENU_LINECOMMENT_NAME   = "Toggle Line Comment",
        RIGHT_CLICK_MENU_LINECOMMENT_COMMAND_ID  = "rightclickmenu.lineComment";

    $('#editor-holder').mousedown(function(event) {
        var el = $(event.target)

        switch (event.which) {
            case 1:
                //alert('Left Mouse button pressed.');
                break;
            case 2:
                //alert('Middle Mouse button pressed.');
                break;
            case 3:
                //alert('Right Mouse button pressed.');
                if(el.find('.CodeMirror-code').length > 0){
                    var editor = EditorManager.getCurrentFullEditor(),
                        selectedText = editor.getSelectedText(),
                        li;
                    if(selectedText.length === 0){
                        li = $('#editor-context-menu-rightclickmenu\\.copy').parent();
                        li.hide();
                        if($('#editor-context-menu-rightclickmenu\\.copy\\.disabled').length===0){
                            $('<li>'+li.html().replace('editor-context-menu-rightclickmenu.copy', 'editor-context-menu-rightclickmenu.copy.disabled')+'</li>').insertBefore(li).find('a').css('color', '#494949');
                        }

                        li = $('#editor-context-menu-rightclickmenu\\.cut').parent();
                        li.hide();
                        if($('#editor-context-menu-rightclickmenu\\.cut\\.disabled').length===0){
                            $('<li>'+li.html().replace('editor-context-menu-rightclickmenu.cut', 'editor-context-menu-rightclickmenu.cut.disabled')+'</li>').insertBefore(li).find('a').css('color', '#494949');
                        }

                        li = $('#editor-context-menu-rightclickmenu\\.uppercase').parent();
                        li.hide();
                        if($('#editor-context-menu-rightclickmenu\\.uppercase\\.disabled').length===0){
                            $('<li>'+li.html().replace('editor-context-menu-rightclickmenu.uppercase', 'editor-context-menu-rightclickmenu.uppercase.disabled')+'</li>').insertBefore(li).find('a').css('color', '#494949');
                        }

                        li = $('#editor-context-menu-rightclickmenu\\.lowercase').parent();
                        li.hide();
                        if($('#editor-context-menu-rightclickmenu\\.lowercase\\.disabled').length===0){
                            $('<li>'+li.html().replace('editor-context-menu-rightclickmenu.lowercase', 'editor-context-menu-rightclickmenu.lowercase.disabled')+'</li>').insertBefore(li).find('a').css('color', '#494949');
                        }
                    }
                    else{
                        li = $('#editor-context-menu-rightclickmenu\\.copy').parent();
                        li.show();
                        $('#editor-context-menu-rightclickmenu\\.copy\\.disabled').remove();

                        li = $('#editor-context-menu-rightclickmenu\\.cut').parent();
                        li.show();
                        $('#editor-context-menu-rightclickmenu\\.cut\\.disabled').remove();

                        li = $('#editor-context-menu-rightclickmenu\\.lowercase').parent();
                        li.show();
                        $('#editor-context-menu-rightclickmenu\\.lowercase\\.disabled').remove();

                        li = $('#editor-context-menu-rightclickmenu\\.uppercase').parent();
                        li.show();
                        $('#editor-context-menu-rightclickmenu\\.uppercase\\.disabled').remove();
                    }
                }
                break;
        }
    });


    /* 
        Function to copy text
    */
    function copyToClipboard() {
        if (window.hasOwnProperty('ZeroClipboard') === false) {
            document.execCommand("copy", false, null);
        }
    }
    /* 
        Function to paste text
    */
    function pasteToEditor() {
        if (window.hasOwnProperty('ZeroClipboard') === false) {
            document.execCommand('paste');
        }
    }
    /* 
        Function to cut text
    */
    function cutToClipboard() {
        if (window.hasOwnProperty('ZeroClipboard') === false) {
            document.execCommand('cut');
        }
    }
    /*
        Function to cut text
    */
    function selectall() {
        document.execCommand('selectall');
    }
    /*
        Function to uppercase text
    */
    function uppercase() {
        var editor = EditorManager.getCurrentFullEditor(),
            selectedText = editor.getSelectedText(),
            pos = editor.getSelection(),
            currentDoc = DocumentManager.getCurrentDocument();
        currentDoc.replaceRange(selectedText.toUpperCase(), pos.start, pos.end);
    }
    /*
        Function to lowercase text
    */
    function lowercase() {
        var editor = EditorManager.getCurrentFullEditor(),
            selectedText = editor.getSelectedText(),
            pos = editor.getSelection(),
            currentDoc = DocumentManager.getCurrentDocument();
        currentDoc.replaceRange(selectedText.toLowerCase(), pos.start, pos.end);
    }

    function blockComment(){
        CommandManager.execute(Commands.EDIT_BLOCK_COMMENT);
    }

    function lineComment(){
        CommandManager.execute(Commands.EDIT_LINE_COMMENT);
    }

    /*
        Register command for menu action
    */
    CommandManager.register(RIGHT_CLICK_MENU_CUT_NAME, RIGHT_CLICK_MENU_CUT_COMMAND_ID, cutToClipboard);
    CommandManager.register(RIGHT_CLICK_MENU_COPY_NAME, RIGHT_CLICK_MENU_COPY_COMMAND_ID, copyToClipboard);
    CommandManager.register(RIGHT_CLICK_MENU_PASTE_NAME, RIGHT_CLICK_MENU_PASTE_COMMAND_ID, pasteToEditor);
    CommandManager.register(RIGHT_CLICK_MENU_UPPERCASE_NAME, RIGHT_CLICK_MENU_UPPERCASE_COMMAND_ID, uppercase);
    CommandManager.register(RIGHT_CLICK_MENU_LOWERCASE_NAME, RIGHT_CLICK_MENU_LOWERCASE_COMMAND_ID, lowercase);
    CommandManager.register(RIGHT_CLICK_MENU_SELECTALL_NAME, RIGHT_CLICK_MENU_SELECTALL_COMMAND_ID, selectall);
    CommandManager.register(RIGHT_CLICK_MENU_BLOCKCOMMENT_NAME, RIGHT_CLICK_MENU_BLOCKCOMMENT_COMMAND_ID, blockComment);
    CommandManager.register(RIGHT_CLICK_MENU_LINECOMMENT_NAME, RIGHT_CLICK_MENU_LINECOMMENT_COMMAND_ID, lineComment);


    /*
        Register menu
    */
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuDivider();
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(RIGHT_CLICK_MENU_CUT_COMMAND_ID);
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(RIGHT_CLICK_MENU_COPY_COMMAND_ID);
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(RIGHT_CLICK_MENU_PASTE_COMMAND_ID);
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(RIGHT_CLICK_MENU_SELECTALL_COMMAND_ID);
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuDivider();
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(RIGHT_CLICK_MENU_UPPERCASE_COMMAND_ID);
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(RIGHT_CLICK_MENU_LOWERCASE_COMMAND_ID);
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuDivider();
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(RIGHT_CLICK_MENU_BLOCKCOMMENT_COMMAND_ID);
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(RIGHT_CLICK_MENU_LINECOMMENT_COMMAND_ID);

    if (!brackets.nativeMenus) {
        if (window.hasOwnProperty('ZeroClipboard') === false) {
            window.ZeroClipboard = window.ZeroClipboard || require("zeroclipboard/ZeroClipboard");
            ZeroClipboard.config({cacheBust: false});
        }

        var Clipboard = new ZeroClipboard($('a[id="editor-context-menu-rightclickmenu.cut"], a[id="editor-context-menu-rightclickmenu.copy"], a[id="editor-context-menu-rightclickmenu.paste"]'));
        window._clipboardData = window._clipboardData || '';

        $('a[id="editor-context-menu-rightclickmenu.cut"]').on('mousedown', function () {
            var thisEditor = EditorManager.getCurrentFullEditor();
            var text = thisEditor._codeMirror.getSelection();
            ZeroClipboard.setData("text/plain", text);
            window._clipboardData = text;
            thisEditor._codeMirror.replaceSelection('');
        });

        $('a[id="editor-context-menu-rightclickmenu.copy"]').on('mousedown', function () {
            var thisEditor = EditorManager.getCurrentFullEditor();
            var text = thisEditor._codeMirror.getSelection();
            ZeroClipboard.setData("text/plain", text);
            window._clipboardData = text;
        });

        $('a[id="editor-context-menu-rightclickmenu.paste"]').on('mousedown', function () {
            var thisEditor = EditorManager.getCurrentFullEditor();
            if (window._clipboardData.length > 0) {
                thisEditor._codeMirror.replaceSelection(window._clipboardData);
            }
        });
    }

});
