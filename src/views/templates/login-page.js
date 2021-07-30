export default function LoginPage(state={}) {
  const { href } = state
  return `
<a href="${href}">Login</a>
`
}
