import React, { createContext, useReducer } from 'react';

const Context = createContext();

const initValue = {
  username: '',
  uid: '',
  socket: io(),
  messages: [],
  onlineUsers: {},
  onlineCount: 0,
  userhtml: ''
};

function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case 'login':
      return { ...state, ...action.payload };
    case 'UPDATE_SYSTEM_MESSAGE':
      return { ...state, ...{ messages: state.messages.concat(action.payload.message) }, ...{ onlineUsers: action.payload.onlineUsers }, ...{ onlineCount: action.payload.onlineCount } };
    case 'UPDATE_USER_MESSAGE':
      return { ...state, ...{ messages: state.messages.concat(action.payload.message) } };
    default:
      return state;
  }
}

const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initValue);
  return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>;
};

const ContextConsumer = Context.Consumer;

export { Context, ContextProvider, ContextConsumer };
