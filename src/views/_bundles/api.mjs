// public/api.mjs
var CREATE = "create";
var UPDATE = "update";
var DESTROY = "destroy";
var LIST = "list";
function API({ store, worker }) {
  if (!store || !worker) {
    throw new Error("Required arguments are { store, worker}");
  }
  worker.onmessage = function mutate(e) {
    const { data } = e;
    const { result, type } = data;
    switch (type) {
      case CREATE:
        createMutation(result);
        break;
      case UPDATE:
        updateMutation(result);
        break;
      case DESTROY:
        destroyMutation(result);
        break;
      case LIST:
        listMutation(result);
        break;
    }
  };
  function createMutation(result) {
    const copy = store.todos.slice();
    copy.push(result);
    console.log("createMutation", copy);
    store.todos = copy;
  }
  function updateMutation(result) {
    const copy = store.todos.slice();
    copy.splice(copy.findIndex((i) => i.key === result.key), 1, result);
    store.todos = copy;
  }
  function destroyMutation(result) {
    const copy = store.todos.slice();
    copy.splice(copy.findIndex((i) => i.key === result.key), 1);
    store.todos = copy;
  }
  function listMutation(result) {
    store.initialize({ todos: result || [] });
  }
  function create(todo) {
    worker.postMessage({
      type: CREATE,
      data: todo
    });
  }
  function destroy(todo) {
    worker.postMessage({
      type: DESTROY,
      data: todo
    });
  }
  function list() {
    worker.postMessage({
      type: LIST
    });
  }
  function update(todo) {
    worker.postMessage({
      type: UPDATE,
      data: todo
    });
  }
  return {
    create,
    update,
    destroy,
    list,
    subscribe: store.subscribe,
    unsubscribe: store.unsubscribe
  };
}
export {
  API as default
};
