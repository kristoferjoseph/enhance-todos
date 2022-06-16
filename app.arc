@app
ftds-001

@static
fingerprint true
spa false

@http
get /
get /auth
get /login
get /todos          # list
get /todos/:id      # read
post /logout
post /todos/delete  # destroy
post /todos/:id     # update
post /todos         # create

@tables
data
  scopeID *String
  dataID **String
  ttl TTL


@plugins
architect/plugin-bundles

@bundles
api '/public/api.mjs'
base-element '/node_modules/@enhance/base-element/index.mjs'
todo-item '/src/views/elements/browser/todo-item.mjs'