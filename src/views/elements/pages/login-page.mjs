export default function LoginPage({ html, state={} }) {
  const { attrs } = state
  const { href } = attrs
  return html`
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
