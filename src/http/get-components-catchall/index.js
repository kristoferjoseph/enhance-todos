const fingerprintedFilePath = require('./fingerprinted-file-path')

exports.handler = async function http (req) {
  const requestedFile = req.requestContext.http.path
  console.log('FILE: ', requestedFile)
  const fingerprinted = fingerprintedFilePath(requestedFile)
  console.log('FINGERPRINT: ', fingerprinted)
  return {
    statusCode: 303,
    headers: {
      'content-type': 'application/javascript; charset=utf8',
      location: fingerprinted
    }
  }
}
