__redux store with a single reducer and action__
```javascript
import { createStore } from 'redux';

// Define the initial state
const initialState = {
  count: 0
};

// Define the reducer function
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

// Create the Redux store
const store = createStore(reducer);

// Dispatch some actions to update the store
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });

// Log the current state of the store
console.log(store.getState());

```
In this example, we have a simple Redux store with a single reducer function that handles two actions: INCREMENT and DECREMENT. The reducer function takes the current state of the store and an action object, and returns a new state based on the action type.
We then create the Redux store using the createStore function from the Redux library, passing in the reducer function as an argument.
Finally, we dispatch three actions to the store to update its state: two INCREMENT actions and one DECREMENT action. We then log the current state of the store to the console using the getState method.
This is just a simplified example, but it demonstrates the basic concepts of Redux, including the use of reducers, actions, and the Redux store. By defining more complex reducers and actions, you can build a scalable and robust application state management system with Redux.

_fredrik (at) conva se_
