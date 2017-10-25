const { Component } = React
const { createStore } = Redux
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
  <p key="1">{props.state}</p>,
  <button key="2" onClick={() => props.dispatch({ type: "INCREMENT" })}>+ 1</button>,
  <button key="3" onClick={() => props.dispatch({ type: "DECREMENT" })}>- 1</button>
]

Counter = connect(state => ({ state }))(Counter)

const store = createStore(
  counter,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById("root")
)
