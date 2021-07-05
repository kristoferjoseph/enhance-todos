@app
ftds-001

@static
fingerprint true
spa false

@http
get /
get /login
get /todos          # list
get /todos/:id      # read
post /logout
post /todos/:id     # update
post /todos/delete  # destroy
post /todos         # create

@tables
data
  scopeID *String
  dataID **String
  ttl TTL