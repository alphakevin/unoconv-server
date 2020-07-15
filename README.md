# unoconv-server

A simple RESTful server for converting documents using [unoconv](https://github.com/dagwieers/unoconv)

## Install

[unoconv](https://github.com/dagwieers/unoconv) is required for converting documents

```shell
# apt-get install unoconv
npm install unoconv-server
```

## Usage

Start a server in command-line:

```shell
./unoconv-server start
```

Get command line help

```shell
./unoconv-server --help
```

```shell
unoconv-server, a simple RESTful server for converting documents
  please visit https://github.com/alphakevin/unoconv-server

usage: unoconv-server <command> <options>

commands:
  start [<hostname>[:<port>]]  start the server, default to localhost:4000
  help converter             get converter help

options:
  -h, --help                 print this help message
```

Use in your application

```javascript
const expores = require('express');
const unoconv = require('unoconv-server');

const app = express();
app.use('/unoconv', unoconv());
// ... your own express routes
app.listen(3000);
```

## Converter

When the server starts, it will start a [listener](https://github.com/dagwieers/unoconv#start-your-own-unoconv-listener)
for better performance, the listener will be stopped together with the server.

The server provides a similar interface like unoconv, you can simply remove `--` or `-` and use `/`
instead of white-space between the arguments, all after `/convert`.

```http
POST /convert/format/<format>[/output/<filename>] HTTP/1.1
```

You can upload file by either of the following method:

* `multipart/form-data` upload with a `file` field of the file to be converted.
* RAW upload a file in HTTP body with `Content-Type` and `Content-Disposition` header provided.

If the `/output/<value>` option is provided, the `Content-Disposition` header will contain the new filename.

The converted document will be directly output from the HTTP response body.

## Environment Variables

| Name | Description |
| ---- | ----------- |
| `HOSTNAME` | For server listening hostname |
| `PORT` | For server listening port |

## Example

Visit `http://127.0.0.1:4000/help`, or get help in command-line:

```shell
./unoconv-server help converter
```

Here we use cURL for examples.

### Uploading with `multipart/form-data`

```shell
curl -F file=@example.docx http://127.0.0.1:4000/convert/format/pdf/output/newname.pdf > result.pdf
```

### Uploading RAW binary data

```shell
curl -X POST \
-T "example.docx" \
-H "Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document" \
-H "Content-Disposition: attachment; filename="example.docx"" \
http://127.0.0.1:4000/convert/format/pdf/output/newname.pdf > result.pdf
```

### Converting options:

```shell
  /e, /export/<value>     set export filter options
  /f, /format/<value>     specify the output format
  /F, /field/<value>      replace user-defined text field with value
  /i, /import/<value>     set import filter option string
  /o, /output/<value>     output basename, filename or directory
      /password/<value>   provide a password to decrypt the document
```

## Playing with Docker

`unoconv-server` can start from docker without source code or npm installed:

```shell
docker run -d -p 4000:4000 --name unoconv alphakevin/unoconv-server
```

## Notice

This is a simple server and it does not include authorization method, please take your own risk
if you want to deploy it public directly.

`export`, `field`, `import`, `password` options are not tested, it just pass them to unoconv.

## Related

* [unoconv](https://github.com/gfloyd/node-unoconv) A node.js wrapper for converting documents with unoconv.
* [unoconv2](https://github.com/HAASLEWER/unoconv2) A version forked from node-uniconv which has better error handling.
* [tfk-api-unoconv](https://github.com/zrrrzzt/tfk-api-unoconv) Unoconv as a webservice together with docker image.
* [filepreview](https://github.com/schul-cloud/filepreview) File preview image as a service

## License

MIT
