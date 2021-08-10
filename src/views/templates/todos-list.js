export default function TodosList(state={}, html) {
  return html`
<style>
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
</style>
<slot name="list">
  <ul>
    <slot></slot>
  </ul>
</slot>
  `
}
