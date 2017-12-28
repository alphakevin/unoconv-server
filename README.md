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

## Converter

When the server starts, it will start a [listener](https://github.com/dagwieers/unoconv#start-your-own-unoconv-listener)
for better performance, the listener will be stopped together with the server.

The server provides a similar interface like unoconv, you can simply remove `--` or `-` and use `/`
instead of white-space between the arguments, or after `/convert` path.

You can upload file by `multipart/form-data` format or RAW format (with `Content-Type` and `Content-Disposition` header)

The converted file will be directly output from the HTTP response body.

If output name is provided, a `Content-Disposition` header will be send for the new filename

# Example

Here we take CURL for example:

```bash
$ ./unoconv-server help converter
unoconv-server
  visit project https://github.com/alphakevin/unoconv-server for more information

usage:
  upload with multipart/form-data:
    curl -F file=@example.docx http://127.0.0.1:4000/convert/format/pdf/output/newname.pdf > result.pdf
  upload raw:
    curl -X POST \
      -T "example.docx" \
      -H "Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document" \
      -H "Content-Disposition: attachment; filename="example.docx"" \
      http://127.0.0.1:4000/convert/format/pdf/output/newname.pdf > result.pdf

converter options:
  /e, /export/<value>     set export filter options
  /f, /format/<value>     specify the output format
  /F, /field/<value>      replace user-defined text field with value
  /i, /import/<value>     set import filter option string
  /o, /output/<value>     output basename, filename or directory
      /password/<value>   provide a password to decrypt the document
```

## Notice

This is a simple server and it does not include authorization method, please take your own risk
if you want to deploy it public directly.

`export`, `field`, `import`, `password` options are not tested, it just pass them to unoconv.

## Related

* [unoconv](https://github.com/gfloyd/node-unoconv) A node.js wrapper for converting documents with unoconv.
* [unoconv2](https://github.com/HAASLEWER/unoconv2) A version forked from node-uniconv which has better error handling.

Both of the two use Buffer for storing the output file in the memory but not stream.

## License

MIT
