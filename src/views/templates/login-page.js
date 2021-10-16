module.exports = function LoginPage(state={}) {
  const { href } = state
  return `
<a href="${href}">
  <button>
    Login with GitHub
  </button>
</a>
<pre><code>
  ${href}
</code></pre>
`
}
