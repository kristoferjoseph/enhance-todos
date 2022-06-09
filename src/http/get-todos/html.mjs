import getTodos from './todos.mjs'
import map from '@architect/views/_bundles/map.mjs'
import enhance from '@enhance/ssr'
import importTransform from '@architect/shared/import-transform.mjs'
import elements from '@architect/views/elements/elements.mjs'
import Head from '@architect/views/document/head.mjs'

const html = enhance({
  elements,
  scriptTransforms: [importTransform({ map })],
})

export default async function HTML(req) {
  try {
    const todos = await getTodos(req)
    const session = req.session
    const error = session.error
    session.error = ''

    return {
      statusCode: 200,
      headers: {
        'content-type': 'text/html; charset=utf8'
      },
      body: html`
      ${Head()}
      <todos-page todos="${todos}" error="${error}"></todos-page>
      `
    }
  }
  catch (err) {
    return {
      statusCode: 500,
      headers: {
        'content-type': 'text/html; charset=utf8'
      },
      body: html`
      ${Head()}
      <error-page error=${err}></error-page>
      `
    }
  }
}