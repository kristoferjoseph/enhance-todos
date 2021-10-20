module.exports = function isJSON(req) {
  let contentType = req.headers['Content-Type'] ||
    req.headers['content-type']

  return /application\/json/ig.test(contentType)
}
