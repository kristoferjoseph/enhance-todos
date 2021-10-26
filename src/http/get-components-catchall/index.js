const fingerprintedFilePath = require('./fingerprinted-file-path')

exports.handler = async function http (req) {
  const requestedFile = req.requestContext.http.path
  const fingerprinted = fingerprintedFilePath(requestedFile)
  return {
    statusCode: 303,
    headers: {
      'content-type': 'application/javascript; charset=utf8',
      location: fingerprinted
    }
  }
}
