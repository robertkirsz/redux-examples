const { Component } = React
const { createStore, combineReducers } = Redux
const { Provider, connect } = ReactRedux

const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1
    case "DECREMENT":
      return state - 1
    default:
      return state
  }
}

let Counter = props => [
  <p key="1">{props.counter}</p>,
  <button key="2" onClick={() => props.dispatch({ type: "INCREMENT" })}>
    + 1
  </button>,
  <button key="3" onClick={() => props.dispatch({ type: "DECREMENT" })}>
    - 1
  </button>
]

Counter = connect(state => ({ counter: state.counter }))(Counter)

const todos = (state = [], action) => {
  if (action.type === "ADD_TODO") return [...state, { id: Date.now(), value: action.value, done: false }]
  if (action.type === "TOGGLE_TODO") return state.map(todo => (todo.id === action.id ? { ...todo, done: !todo.done } : todo))
  if (action.type === "DELETE_DONE") return state.filter(todo => !todo.done)
  return state
}

class Todos extends Component {
  state = { value: "" }

  handleChange = e => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.dispatch({ type: "ADD_TODO", value: this.state.value })
  }

  render = () => [
    this.props.todos.map(todo => (
      <div
        key={todo.id}
        onClick={() => this.props.dispatch({ type: "TOGGLE_TODO", id: todo.id })}
        style={todo.done ? { textDecoration: "line-through" } : {}}
      >
        {todo.value}
      </div>
    )),
    <form key="form" onSubmit={this.handleSubmit}>
      <input value={this.state.value} onChange={this.handleChange} />
      <button type="submit">Add new</button>
      <button type="button" onClick={() => this.props.dispatch({ type: "DELETE_DONE" })}>Delete done</button>
    </form>
  ]
}

const ConnectedTodos = connect(state => ({ todos: state.todos }))(Todos)

class App extends Component {
  state = { message: "Hello Redux!" }

  render = () => (
    <div>
      <h3>{this.state.message}</h3>
      <Counter />
      <br />
      <br />
      <ConnectedTodos />
    </div>
  )
}

const store = createStore(
  combineReducers({ counter, todos }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
