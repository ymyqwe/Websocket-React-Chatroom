import React, { useState } from 'react';
import ChatRoom from '../components/ChatRoom';
import '../style/index.scss';

// const initialState = {
//   username: '',
//   uid: '',
//   socket: io()
// };
const userState = (initialState) => {
  const [user, setUser] = useState(initialState);
  return [user, setUser];
};

const generateUid = () => {
  return new Date().getTime() + '' + Math.floor(Math.random() * 999 + 1);
};

const App = (props) => {
  const [user, setUser] = userState({ username: '', uid: '', socket: io() });
  const handleLogin = () => {
    const uid = generateUid();
    const username = user.username ? user.username : `游客${uid}`;
    setUser((prevState) => ({ ...prevState, ...{ uid, username } }));
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
                setUser((prevState) => ({ ...prevState, ...{ username: e.target.value } }));
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
// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       uid: '',
//       socket: io()
//     };
//   }

//   // 生成用户id

//   // 监控名称变化
//   handleChange(e) {
//     this.setState({ username: e.target.value });
//   }

//   // 监控点击提交或按回车
//   handleClick(e) {
//     e.preventDefault();
//     this.handleLogin();
//   }
//   handleKeyPress(e) {
//     if (e.key == 'Enter') {
//       this.handleLogin();
//     }
//     return false;
//   }

//   // 登陆
//   handleLogin() {
//     let username = this.state.username;

//     // 随机生成游客名字
//     // username = '游客' + Math.floor(Math.random()*89+10)
//     const uid = this.generateUid();
//     if (!username) {
//       username = '游客' + uid;
//     }
//     this.setState({ uid: uid, username: username });
//     this.state.socket.emit('login', { uid: uid, username: username });
//   }
//   render() {
//     let renderDOM;
//     if (this.state.uid) {
//       renderDOM = <ChatRoom uid={this.state.uid} username={this.state.username} socket={this.state.socket} />;
//     } else {
//       renderDOM = (
//         <div className="login-box">
//           <h2>登 陆</h2>
//           <div className="input">
//             <input type="text" placeholder="请输入用户名" onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} />
//           </div>
//           <div className="submit">
//             <button type="button" onClick={this.handleClick.bind(this)}>
//               提交
//             </button>
//           </div>
//         </div>
//       );
//     }
//     return <div>{renderDOM}</div>;
//   }
// }
