const deleteTodo = require('./delete-todo')
const Enhance = require('@begin/enhance')
const html = Enhance({
  templates: '@architect/views/templates',
  modules: '_static/components'
})

module.exports = function HTML(req) {
  try {
    deleteTodo(req)
    return {
      statusCode: 302,
      headers: {
        location: '/todos',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      }
    }
  }
  catch (err) {
    return {
      statusCode: 200,
      headers: {
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'content-type': 'text/html; charset=utf8'
      },
      body: html`<error-page error="${err}"></error-page>`
    }
  }
}
