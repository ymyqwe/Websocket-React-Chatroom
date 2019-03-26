[![Build Status](https://travis-ci.org/ymyqwe/Websocket-React-Chatroom.svg?branch=master)](https://travis-ci.org/ymyqwe/Websocket-React-Chatroom)

# Websocket-React-Chatroom

A Chatroom powered by [`React`](https://reactjs.org/), [`Socket.io`](https://socket.io/)

## Features

- Using [React-Hooks](https://reactjs.org/docs/hooks-intro.html) to manage state
- Using [Socket.io](https://socket.io/) to receive real-time message

## Getting Started

1. Clone this repo

2. Install dependencies

```bash
npm install
```

3. Try out

```bash
npm start
```

## Demo

[Live Demo](http://chat.yumingyuan.me)

## Preview

![image](https://github.com/ymyqwe/Websocket-React-Chatroom/raw/master/chat.gif)

## TODO

- [x] [Redux](https://github.com/reduxjs/redux)-like style state manage
- [x] [Log4js](https://github.com/log4js-node/log4js-node)
- [ ] [React-router](https://github.com/ReactTraining/react-router)
- [ ] [Typescript](https://github.com/Microsoft/TypeScript)
- [x] [Webpack-v4](https://github.com/webpack/webpack)
- [ ] Test

## Changelog

### [2.2.0] / 2019-03-26

- Upgrade webpack to v4
- Add logs using log4js

### [2.1.0] / 2018-12-11

- Refactor Message.js with `useRef` and `useEffect`

### [2.0.0] / 2018-12-03

- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Eslint](https://github.com/eslint/eslint)
- [Prettier](https://github.com/prettier/prettier)
- [Travis-CI](https://travis-ci.org/)

### [1.0.0] / 2017-02-15

- React state
- [Socket.io](https://socket.io/)
- [Webpack-v2](https://github.com/webpack/webpack)
- [Expressjs](https://github.com/expressjs/express)
