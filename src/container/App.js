import React, { /* useState */ useReducer } from 'react';
import ChatRoom from '../components/ChatRoom';
import '../style/index.scss';

const initialState = {
  username: '',
  uid: '',
  socket: io()
};

// const userState = (initialState) => {
//   const [user, setUser] = useState(initialState);
//   return [user, setUser];
// };

const generateUid = () => {
  return new Date().getTime() + '' + Math.floor(Math.random() * 999 + 1);
};

// Redux like reducer
function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, ...action.payload };
    case 'inputUser':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const App = (props) => {
  const [user, dispatch] = useReducer(reducer, initialState);
  console.log('user', user);
  // const [user, setUser] = userState({ username: '', uid: '', socket: io() });
  const handleLogin = () => {
    const uid = generateUid();
    const username = user.username ? user.username : `游客${uid}`;
    // setUser((prevState) => ({ ...prevState, ...{ uid, username } }));
    dispatch({ type: 'login', payload: { uid, username } });
    user.socket.emit('login', { uid, username });
  };
  const handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      handleLogin();
    }
    return false;
  };
  return (
    <div>
      {user.uid ? (
        <ChatRoom uid={user.uid} username={user.username} socket={user.socket} />
      ) : (
        <div className="login-box">
          <h2>登 陆</h2>
          <div className="input">
            <input
              type="text"
              placeholder="请输入用户名"
              onChange={(e) => {
                // 异步操作，事件需要维持
                e.persist();
                dispatch({ type: 'inputUser', payload: { username: e.target.value } });
                // setUser((prevState) => ({ ...prevState, ...{ username: e.target.value } }));
              }}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="submit">
            <button type="button" onClick={handleLogin}>
              提交
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
