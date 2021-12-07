module.exports = function TodosList(state={}, html) {
  return html`
<ul class="js-list">
  <slot></slot>
</ul>
<script type="module" src="/components/todos-list.js"></script>
  `
}
