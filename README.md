# node-ide

The project is a fork of [adobe/brackets](https://github.com/adobe/brackets) with some code from [rabchev/brackets-server](https://github.com/rabchev/brackets-server).

The goal is to provide an up-to-date Adobe Brackets running instance for single project servers with optimizations (upcoming).

The distribution includes several extensions:

  * [Reasonable Comments](https://github.com/peterflynn/reasonable-comments)
  * [Proper Indent](https://github.com/busykai/brackets-indent-right)
  * [Extended HTML5 Code Hints](https://github.com/coliff/Brackets-HTML5CodeHints)
  * [Minimap](https://github.com/zorgzerg/brackets-minimap)
  * [JSCS](https://github.com/globexdesigns/brackets-jscs)
  * [Darcula Theme](https://github.com/AlbertoDorado/darcula-for-brackets)
  * [Indentator](https://github.com/ahuth/brackets-indentator)
  * [Go to Matching Bracket](https://github.com/davidwaterston/goto-matching-bracket)
  * [ECMAScript 6/7 Highlight](https://github.com/marcominetti/brackets-esnext-highlight)
  * [File and Folder Duplicate](https://github.com/torinpascal/brackets-duplicate-extension)
  * [Copy as HTML](https://github.com/peterflynn/copy-as-html)
  * [Print Margin](https://github.com/Hirse/brackets-print-margin)
  * [Additional Right Click Menu](https://github.com/caphodel/brackets-additional-right-click-menu)
  * [Markdown Preview](https://github.com/gruehle/MarkdownPreview)
  * [JSDoc FuncDocr](https://github.com/wikunia/brackets-funcdocr)
  * [Double Click Matching Bracket](https://github.com/pessotti/brackets-doubleclick-match-brackets)

# Usage

## Javascript In-process

```javascript
    var path        = require("path"),
        http        = require("http"),
        brackets    = require("node-ide/lib/server"),
        server      = http.createServer(function(req,res){
        });

    var options = {
        httpRoot: "/brackets",
        projectsDir: path.join(__dirname, "..", "root"),
        supportDir: path.join(__dirname, "..", "data"),
        allowUserDomains: false,
    };
    brackets.start(server, options);

    server.listen(9092);

    console.log("You can access Brackets on http://localhost:9092/brackets/");
```

## Javascript Out-process

```javascript
    require('child_process').spawn('node', [
      path.join(__dirname, "node_modules", "node-ide", "lib", "run.js"),
      '--port',
      '9092',
      '--proj-dir',
      path.join(__dirname, "..", "root"),
      '--supp-dir',
      path.join(__dirname, "..", "data"),
      '--user-domains',
      'false'
    ]);

    console.log("You can access Brackets on http://localhost:9092/brackets/");
```


# License

MIT License

Copyright (c) 2014-2015 Marco Minetti. All rights reserved.

Copyright (c) 2012-2015 Adobe Systems Incorporated. All rights reserved.

Copyright (c) 2012 Boyan Rabchev <boyan@rabchev.com>. All rights reserved.


Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

