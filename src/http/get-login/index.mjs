import arc from '@architect/functions'
const clientID = process.env.GITHUB_CLIENT_ID
const href = `https://github.com/login/oauth/authorize?client_id=${clientID}`
import enhance from '@enhance/ssr'
import elements from '@architect/views/elements/elements.mjs'
const html = enhance({
  elements
})

export const handler = arc.http.async(login)

async function login() {
  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/html; charset=utf8'
    },
    body: html`<login-page href="${href}"></login-page>`
  }
}
