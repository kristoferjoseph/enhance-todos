export default function TodoItem(state={}, html) {
  const { text } = state
  return `
<li>${text}</li>
`
}
