# unoconv-server

A simple RESTful wrapper for [unoconv](https://github.com/dagwieers/unoconv)

## Install

[unoconv](https://github.com/dagwieers/unoconv) is required for converting documents

```bash
# apt-get install unoconv
npm install unoconv-server
```

## Usage

Start a server in command-line:

```bash
./unoconv-server start
```

Get command line help

```bash
./unoconv-server --help
```

Use in your application

```javascript
const expores = require('express');
const unoconv = require('unoconv-server');

const app = express();
app.use('/converter', unoconv);
// ... your own express routes
app.listen(3000);
```

## Converter Options

The server provides a similar interface like unoconv, except it uses `/` for separating arguments

```
$ ./unoconv-server help converter

usage:
  curl -F file=@somefile.docx http://127.0.0.1:4000/convert/format/pdf/output/newname.pdf > result.pdf

converter options:
  /e, /export/<value>     set export filter options
  /f, /format/<value>     specify the output format
  /F, /field/<value>      replace user-defined text field with value
  /i, /import/<value>     set import filter option string
  /o, /output/<value>     output basename, filename or directory
      /password/<value>   provide a password to decrypt the document
```

If output name is provided, a `Content-Disposition` header will be send for the new filename

## Notice

This is a simple server and it does NOT provide authorization method, please do not use it for public directly.

## Related

* [unoconv](https://github.com/gfloyd/node-unoconv) A node.js wrapper for converting documents with unoconv.
* [unoconv2](https://github.com/HAASLEWER/unoconv2) A version forked from node-uniconv which has better error handling.

Both of the two use Buffer for storing the output file in the memory but not stream.

## License

MIT
