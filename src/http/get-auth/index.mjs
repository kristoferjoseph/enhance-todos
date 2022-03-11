import arc from '@architect/functions'
import github from './github.mjs'

export const handler = arc.http.async(auth)

async function auth (req) {
  const { query: { code } } = req
  if (code) {
    try {
      const account = await github(req)
      return {
        session: { account },
        location: '/'
      }
    }
    catch (err) {
      return {
        statusCode: err.code,
        body: err.message
      }
    }
  }
  else {
    return {
      statusCode: 302,
      location: '/'
    }
  }
}
