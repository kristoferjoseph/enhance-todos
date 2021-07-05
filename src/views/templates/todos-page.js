export default function TodosPage(state={}) {
  const { todos } = state
  return `
<div>
  <input type="text" placeholder="Enter your todo">
  <todos-list todos=${todos}></todos-list>
</div>
`
}
