import arc from '@architect/functions'

export const handler = arc.http.async(main)

async function main (req) {
  const { session = {} } = req
  const { account = {} } = session
  const { id: accountId } = account

  if (accountId) {
    return {
      statusCode: 302,
      location: '/todos'
    }
  }
  else {
    return {
      statusCode: 302,
      location: '/login'
    }
  }
}
