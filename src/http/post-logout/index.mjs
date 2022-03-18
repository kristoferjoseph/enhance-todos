import arc from '@architect/functions'

export const handler = arc.http.async(logout)

async function logout () {
  return {
    session: {},
    location: '/'
  }
}

