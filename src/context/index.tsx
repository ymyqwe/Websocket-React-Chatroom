import React, { createContext, useReducer } from 'react';
import io from 'socket.io-client';

const Context = createContext(null);

interface StateType {
  username: string;
  uid: string;
  socket: any;
  messages: [];
  onlineUsers: { [key: string]: string };
  onlineCount: number;
  userhtml: string;
}

const initValue: StateType = {
  username: '',
  uid: '',
  socket: io(),
  messages: [],
  onlineUsers: {},
  onlineCount: 0,
  userhtml: ''
};
interface Login {
  uid: string;
  username: string;
}

const login = (info: Login): object => {
  return info;
};

interface SystemMessage {
  onlineCount: number;
  onlineUsers: object;
  message: Message;
}

const systemMessage = (sysMsg: SystemMessage, state): object => {
  return {
    messages: state.messages.concat(sysMsg.message),
    onlineUsers: sysMsg.onlineUsers,
    onlineCount: sysMsg.onlineCount
  };
};

interface Message {
  type: number;
  username: string;
  uid: string;
  action: string;
  msgId: string;
  time: string;
}
interface UserMessage {
  message: Message;
}
const userMessage = (usrMsg: UserMessage, state): object => {
  return {
    messages: state.messages.concat(usrMsg.message)
  };
};
interface Payload extends UserMessage, SystemMessage, Login {}
interface ActionType {
  type: string;
  payload: Payload;
}

const reducer = (state: StateType, action: ActionType): StateType => {
  // console.log(state, action);
  switch (action.type) {
    case 'login':
      return { ...state, ...login(action.payload) };
    case 'UPDATE_SYSTEM_MESSAGE':
      return { ...state, ...systemMessage(action.payload, state) };
    case 'UPDATE_USER_MESSAGE':
      return { ...state, ...userMessage(action.payload, state) };
    default:
      return state;
  }
};

const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initValue);
  return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>;
};

const ContextConsumer = Context.Consumer;

export { Context, ContextProvider, ContextConsumer };
