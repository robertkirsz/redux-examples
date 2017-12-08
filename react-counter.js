const { Component } = React
const { createStore } = Redux
const { Provider, connect } = ReactRedux

const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT": return state + action.value
    case "DECREMENT": return state - action.value
    default: return state
  }
}

const store = createStore(
  counter,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const actions = [
  { type: "INCREMENT", value: 1 },
  { type: "DECREMENT", value: 1 }
]

const dispatch = actions.reduce((all, action) => {
  all[_.camelCase(action.type)] = payload => store.dispatch({ ...action, ...(payload.nativeEvent ? {} : payload) })
  return all
}, {})

let Counter = props => [
  <p key="1">{props.state}</p>,
  <button key="2" onClick={() => dispatch.increment({ value: 10 })}>+ 1</button>,
  <button key="3" onClick={dispatch.decrement}>- 1</button>,
]

Counter = connect(state => ({ state }))(Counter)

ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById("root")
)
