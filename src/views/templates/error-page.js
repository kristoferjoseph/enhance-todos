module.exports = function ErrorPage(state={}) {
  const { error } = state
  return `
<h1>Error</h1>
<p>
  ${error.message}
</p>
<pre><code>
${JSON.stringify(err, null, 2)}
</code></pre>
`
}
