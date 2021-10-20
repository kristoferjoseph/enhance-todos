const isJSON = require('./is-json')

module.exports = async function auth(req) {
  const accountID = req.session?.account?.id

  if (!accountID) {
    if (isJSON(req)) {
      return {
        statusCode: 401
      }
    }
    else {
      return {
        statusCode: 302,
        headers: {
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
        },
        location: '/'
      }
    }
  }
  else {
    return false
  }
}
