const getFile = require('./checkForFile')
const bundler = require('./bundler')

exports.handler = async function http(req) {
  const requestedFile = req.requestContext.http.path.replace('/_bundle', '')
  const waterfall = !!(req.queryStringParameters && req.queryStringParameters.waterfall)
  if (waterfall) {
    return {
      statusCode: 303,
      Headers: `/_static/${requestedFile}`
    }
  }
  else {
    try {
      const file = await getFile(requestedFile)
      if (!file) {
        return {
          statusCode: 404,
          body: `File not found: ${requestedFile}`
        }
      }
      const bundle = await bundler(file)
      return {
        statusCode: 303,
        location: bundle
      }
    }
    catch(e) {
      let error = JSON.stringify({ message: e.message, code: e.code, name: e.name, stack: e.stack })
      console.error(error)
      return {
        statusCode: 500,
        body: error
      }
    }
  }
}
