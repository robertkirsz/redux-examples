const { Component } = React
const { createStore, combineReducers } = Redux
const { Provider, connect } = ReactRedux
const { Field, reduxForm } = ReduxForm
const formReducer = ReduxForm.reducer

let ContactForm = props => (
  <form onSubmit={props.handleSubmit}>
    <Field name="todoValue" component="input" />
    <button type="submit">Submit</button>
    <button type="button" onClick={() => props.dispatch({ type: "DELETE_DONE" })}>Delete done</button>
    <button type="button" onClick={() => props.change("todoValue", "lorem ipsum")}>Set to "lorem ipsum"</button>
  </form>
)

ContactForm = reduxForm({ form: "newTodo" })(ContactForm)

const todos = (state = [], action) => {
  if (action.type === "ADD_TODO") return [...state, { id: Date.now(), value: action.value, done: false }]
  if (action.type === "TOGGLE_TODO") return state.map(todo => (todo.id === action.id ? { ...todo, done: !todo.done } : todo))
  if (action.type === "DELETE_DONE") return state.filter(todo => !todo.done)
  return state
}

let Todos = props => [
  props.todos.map(todo => (
    <div
      key={todo.id}
      onClick={() => props.dispatch({ type: "TOGGLE_TODO", id: todo.id })}
      style={todo.done ? { textDecoration: "line-through" } : {}}
    >
      {todo.value}
    </div>
  )),
  <ContactForm
    key="form"
    onSubmit={values => { props.dispatch({ type: "ADD_TODO", value: values.todoValue }) }}
  />
]

Todos = connect(state => ({ todos: state.todos }))(Todos)

class App extends Component {
  state = { message: "Hello Redux Form!" }

  render = () => (
    <div>
      <h3>{this.state.message}</h3>
      <Todos />
    </div>
  )
}

const store = createStore(
  combineReducers({ todos, form: formReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
