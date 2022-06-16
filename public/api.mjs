import Store from './store.mjs'

const CREATE = 'create'
const UPDATE = 'update'
const DESTROY = 'destroy'
const LIST = 'list'

let worker
let store
export default function API({ initialState={}, workerURL }) {
  if (!store) {
    store = initialState
      ? Store(initialState)
      : Store()
  }

  if (!worker) {
    worker = new Worker(workerURL)
  }

  worker.onmessage = function mutate(e) {
    const { data } = e
    const { result, type } = data
    switch (type) {
    case CREATE:
      createMutation(result)
      break
    case UPDATE:
      updateMutation(result)
      break
    case DESTROY:
      destroyMutation(result)
      break
    case LIST:
      listMutation(result)
      break
    }
  }

  function createMutation(result) {
    const copy = store.todos.slice()
    copy.push(result)
    console.log('createMutation', copy)
    store.todos = copy
  }

  function updateMutation(result) {
    const copy = store.todos.slice()
    copy.splice(copy.findIndex(i => i.key === result.key), 1, result)
    store.todos = copy
  }

  function destroyMutation(result) {
    const copy = store.todos.slice()
    copy.splice(copy.findIndex(i => i.key === result.key), 1)
    store.todos = copy
  }

  function listMutation(result) {
    store.initialize({ todos: result || [] })
  }

  function create(todo) {
    worker.postMessage({
      type: CREATE,
      data: todo
    })
  }

  function destroy (todo) {
    worker.postMessage({
      type: DESTROY,
      data: todo
    })
  }

  function list () {
    worker.postMessage({
      type: LIST
    })
  }

  function update (todo) {
    worker.postMessage({
      type: UPDATE,
      data: todo
    })
  }

  return {
    create,
    update,
    destroy,
    list,
    subscribe: store.subscribe,
    unsubscribe: store.unsubscribe
  }
}
