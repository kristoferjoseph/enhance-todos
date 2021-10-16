const arc = require('@architect/functions')
const clientID = process.env.GITHUB_CLIENT_ID
const href = `https://github.com/login/oauth/authorize?client_id=${clientID}`
const Enhance = require('@begin/enhance')
const html = Enhance({
  templates: '@architect/views/templates',
  modules: '_static/components'
})

exports.handler = arc.http.async(login)

async function login() {
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: html`<login-page href="${href}"></login-page>`
  }
}
