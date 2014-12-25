# node-ide

<<<<<<< HEAD
The project is a fork of [adobe/brackets](https://github.com/adobe/brackets) with some code from [rabchev/brackets-server](https://github.com/rabchev/brackets-server).
=======
Brackets is a modern open-source code editor for HTML, CSS
and JavaScript that's *built* in HTML, CSS and JavaScript. 
>>>>>>> ea908cae55233d34f04b4f2cab5faf62ffa4fb42

The goal is to provide an up-to-date Adobe Brackets running instance for single project servers with optimizations (upcoming).


<<<<<<< HEAD
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
    brackets(server, options);

    server.listen(9092);

    console.log("You can access Brackets on http://localhost:9092/brackets/");
```

## Javascript Out-process
=======
Brackets is at 1.0 and we're not stopping there. We have many feature ideas on our
[trello board](http://bit.ly/BracketsTrelloBoard) that we're anxious to add and other
innovative web development workflows that we're planning to build into Brackets. 
So take Brackets out for a spin and let us know how we can make it your favorite editor. 

You can see some 
[screenshots of Brackets](https://github.com/adobe/brackets/wiki/Brackets-Screenshots)
on the wiki, [intro videos](http://www.youtube.com/user/CodeBrackets) on YouTube, and news on the [Brackets blog](http://blog.brackets.io/).

How to install and run Brackets
-------------------------------
#### Download
>>>>>>> ea908cae55233d34f04b4f2cab5faf62ffa4fb42

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

