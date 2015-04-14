/*
 * Copyright (c) 2015 Marco Minetti. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/*global define, brackets, console, $ */
define(function (require, exports, module) {
    'use strict';

    var EditorManager = brackets.getModule("editor/EditorManager");

    if (window.hasOwnProperty('ZeroClipboard') === false) {
        window.ZeroClipboard = window.ZeroClipboard || require("zeroclipboard/ZeroClipboard");
        ZeroClipboard.config({cacheBust: false});
    }

    var Clipboard = new ZeroClipboard($('a[id="edit-menu-edit.cut"], a[id="edit-menu-edit.copy"], a[id="edit-menu-edit.paste"]'));

    window._clipboardData = window._clipboardData || '';

    $('a[id="edit-menu-edit.cut"]').on('mousedown',function(){
      var thisEditor = EditorManager.getCurrentFullEditor();
      var text = thisEditor._codeMirror.getSelection();
      ZeroClipboard.setData("text/plain",text);
      window._clipboardData = text;
      thisEditor._codeMirror.replaceSelection(''); 
    });

    $('a[id="edit-menu-edit.copy"]').on('mousedown',function(){
      var thisEditor = EditorManager.getCurrentFullEditor();
      var text = thisEditor._codeMirror.getSelection();
      ZeroClipboard.setData("text/plain",text);
      window._clipboardData = text;
    });

    $('a[id="edit-menu-edit.paste"]').on('mousedown',function(){
      var thisEditor = EditorManager.getCurrentFullEditor();
      if (window._clipboardData.length > 0) {
          thisEditor._codeMirror.replaceSelection(window._clipboardData);
      } 
    });
});
