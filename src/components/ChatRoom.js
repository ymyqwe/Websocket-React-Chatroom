import React, { useContext, useState } from 'react';
import Messages from './Messages';
import ChatInput from './ChatInput';
import { Context } from '../context';

// 生成消息id
const generateMsgId = () => {
  return new Date().getTime() + '' + Math.floor(Math.random() * 899 + 100);
};

// 时间格式
const generateTime = () => {
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  hour = hour == 0 ? '00' : hour;
  minute = minute < 10 ? '0' + minute : minute;
  return hour + ':' + minute;
};

const ChatRoom = (props) => {
  const { state, dispatch } = useContext(Context);
  const [init, setInit] = useState(false);
  // 更新系统消息
  const updateSysMsg = (o, action) => {
    const newMsg = { type: 'system', username: o.user.username, uid: o.user.uid, action: action, msgId: generateMsgId(), time: generateTime() };
    dispatch({
      type: 'UPDATE_SYSTEM_MESSAGE',
      payload: {
        onlineCount: o.onlineCount,
        onlineUsers: o.onlineUsers,
        message: newMsg
      }
    });
  };

  // 发送新消息
  const updateMsg = (obj) => {
    const newMsg = { type: 'chat', username: obj.username, uid: obj.uid, action: obj.message, msgId: generateMsgId(), time: generateTime() };
    dispatch({
      type: 'UPDATE_USER_MESSAGE',
      payload: {
        message: newMsg
      }
    });
  };
  // 监听消息发送
  const ready = () => {
    const { socket } = props;
    setInit(true);
    socket.on('login', (o) => {
      updateSysMsg(o, 'login');
    });
    socket.on('logout', (o) => {
      updateSysMsg(o, 'logout');
    });
    socket.on('message', (obj) => {
      updateMsg(obj);
    });
  };
  if (!init) {
    ready();
  }
  const renderUserList = () => {
    const users = state.onlineUsers;
    let userhtml = '';
    let separator = '';
    for (const key in users) {
      if (users.hasOwnProperty(key)) {
        userhtml += separator + users[key];
        separator = '、';
      }
    }
    return userhtml
  }
  // console.log('messags', state);
  return (
    <div className="chat-room">
      <div className="welcome">
        <div className="room-action">
          <div className="room-name">鱼头的聊天室 | {props.username}</div>
          <div className="button">
            <button onClick={() => window.location.reload()}>登出</button>
          </div>
        </div>
      </div>
      <div className="room-status">
        在线人数: {state.onlineCount}, 在线列表: {renderUserList()}
      </div>
      {/* <RoomStatus onlineCount={state.onlineCount} userhtml={state.userhtml} /> */}
      <div>
        <Messages messages={state.messages} myId={props.uid} />
        <ChatInput myId={props.uid} myName={props.username} socket={props.socket} />
      </div>
    </div>
  );
};
export default ChatRoom;
// export default class ChatRoom extends Component {
//   constructor(props) {
//     super(props);
//     console.log(props);
//     const socket = this.props.socket;
//     this.state = {
//       myId: this.props.uid,
//       myName: this.props.username,
//       uid: this.props.uid,
//       username: this.props.username,
//       socket: socket,
//       messages: [],
//       onlineUsers: {},
//       onlineCount: 0,
//       userhtml: ''
//     };
//     this.ready();
//   }

//   // 处理在线人数及用户名
//   handleUsers() {
//     const users = state.onlineUsers;
//     let userhtml = '';
//     let separator = '';
//     for (const key in users) {
//       if (users.hasOwnProperty(key)) {
//         userhtml += separator + users[key];
//         separator = '、';
//       }
//     }
//     this.setState({ userhtml: userhtml });
//   }

//   // 生成消息id
//   generateMsgId() {
//     return new Date().getTime() + '' + Math.floor(Math.random() * 899 + 100);
//   }

//   // 更新系统消息
//   updateSysMsg(o, action) {
//     let messages = this.state.messages;
//     const newMsg = { type: 'system', username: o.user.username, uid: o.user.uid, action: action, msgId: this.generateMsgId(), time: this.generateTime() };
//     messages = messages.concat(newMsg);
//     this.setState({
//       onlineCount: o.onlineCount,
//       onlineUsers: o.onlineUsers,
//       messages: messages
//     });
//     this.handleUsers();
//   }

//   // 发送新消息
//   updateMsg(obj) {
//     let messages = this.state.messages;
//     const newMsg = { type: 'chat', username: obj.username, uid: obj.uid, action: obj.message, msgId: this.generateMsgId(), time: this.generateTime() };
//     messages = messages.concat(newMsg);
//     this.setState({ messages: messages });
//   }

//   // 生成时间
//   generateTime() {
//     let hour = new Date().getHours();

//     let minute = new Date().getMinutes();
//     hour = hour == 0 ? '00' : hour;
//     minute = minute < 10 ? '0' + minute : minute;
//     return hour + ':' + minute;
//   }

//   handleLogout() {
//     location.reload();
//   }
//   // 开始监控socket
//   ready() {
//     const socket = this.state.socket;
//     socket.on('login', (o) => {
//       this.updateSysMsg(o, 'login');
//     });
//     socket.on('logout', (o) => {
//       this.updateSysMsg(o, 'logout');
//     });
//     socket.on('message', (obj) => {
//       this.updateMsg(obj);
//     });
//   }

//   render() {
//     return (
//       <div className="chat-room">
//         <div className="welcome">
//           <div className="room-action">
//             <div className="room-name">鱼头的聊天室 | {this.state.myName}</div>
//             <div className="button">
//               <button onClick={this.handleLogout}>登出</button>
//             </div>
//           </div>
//         </div>
//         <RoomStatus onlineCount={this.state.onlineCount} userhtml={this.state.userhtml} />
//         <div ref={(dom) => (this.chatArea = dom)}>
//           <Messages messages={this.state.messages} myId={this.state.myId} />
//           <ChatInput myId={this.state.myId} myName={this.state.myName} socket={this.state.socket} />
//         </div>
//       </div>
//     );
//   }
// }
