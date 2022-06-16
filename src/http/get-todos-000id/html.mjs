import readTodo  from './read-todo.mjs'
import enhance from '@enhance/ssr'
import elements from '@architect/views/elements/elements.mjs'
import map from '@architect/bundles/map.mjs'
import importTransform from '@architect/shared/import-transform.mjs'
const html = enhance({
  elements,
  scriptTransforms: [importTransform({ map })],
})

export const handler = async function HTML(req) {
  try {
    const todo = await readTodo(req)
    return {
      statusCode: 200,
      headers: {
        'content-type': 'text/html; charset=utf8'
      },
      body: html`<todo-page todo=${todo}></todo-page>`

    }
  }
  catch (err) {
    return {
      statusCode: 500,
      headers: {
        'content-type': 'text/html; charset=utf8'
      },
      body: html`<error-page error=${err}></error-page>`
    }
  }
}
