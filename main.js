/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
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
 * 
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $, window, setTimeout, brackets */

define(function (require, exports, module) {
    "use strict";
    var CommandManager       = brackets.getModule("command/CommandManager"),
        Menus                = brackets.getModule("command/Menus"),
        DocumentManager      = brackets.getModule("document/DocumentManager"),
        DebugCommandHandlers = brackets.getModule("debug/DebugCommandHandlers");
    
    var unittestRegex = /\/\*\s*unittests:\s*([\w\s]+)\s*\*\//;
    
    function runTests() {
        var doc = DocumentManager.getCurrentDocument();
        var text = doc.getText();
        var match = unittestRegex.exec(text);
        var suite = match !== null ? match[1] : "";
        DebugCommandHandlers._runUnitTests(suite);
    }
    
    function init() {
        var command = CommandManager.register("Quick Tests", "dangoor.testquickly.quicktests", runTests);
        var debugMenu = Menus.getMenu(Menus.AppMenuBar.DEBUG_MENU);
        debugMenu.addMenuItem(command, "Ctrl-P", Menus.AFTER, "debug.runUnitTests");
    }
    
    init();
});
