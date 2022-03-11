import isJSON from './is-json.mjs'

export default async function auth(req) {
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
