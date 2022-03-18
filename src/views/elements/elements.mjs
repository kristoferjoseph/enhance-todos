import TodoItem from "./components/todo-item.mjs"
import TodosHeader from "./components/todos-header.mjs"
import TodosList from "./components/todos-list.mjs"
import ErrorPage from "./pages/error-page.mjs"
import LoginPage from "./pages/login-page.mjs"
import MainPage from "./pages/main-page.mjs"
import TodoPage from "./pages/todo-page.mjs"
import TodosPage from "./pages/todos-page.mjs"

const elements = {
  'todo-item': TodoItem,
  'todos-header': TodosHeader,
  'todos-list': TodosList,
  'error-page': ErrorPage,
  'login-page': LoginPage,
  'main-page': MainPage,
  'todo-page': TodoPage,
  'todos-page': TodosPage
}

export default elements