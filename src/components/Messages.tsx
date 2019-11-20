import React, { useContext, useEffect, useRef } from 'react';
import { Context } from '../context';

const Message = (props) => {
  if (props.msgType == 'system') {
    return (
      <div className="one-message system-message">
        {props.msgUser} {props.action == 'login' ? '进入了聊天室' : '离开了聊天室'} <span className="time">&nbsp;{props.time}</span>
      </div>
    );
  } else {
    return (
      <div className={props.isMe ? 'me one-message' : 'other one-message'}>
        <p className="time">
          <span>{props.msgUser}</span> {props.time}
        </p>
        <div className="message-content">{props.action}</div>
      </div>
    );
  }
};

const Messages = (props) => {
  const messageList = useRef(null);
  // 使用context中的状态，而不是props传值
  const { state } = useContext(Context);

  // 使用useFffect取代componentDidUpdate
  useEffect(() => {
    window.scrollTo(0, messageList.current.clientHeight + 50);
  });
  const { uid, messages } = state;
  return (
    <div className="messages" ref={messageList}>
      {messages.map((message) => (
        <Message key={message.msgId} msgType={message.type} msgUser={message.username} action={message.action} isMe={uid == message.uid ? true : false} time={message.time} />
      ))}
    </div>
  );
};

export default Messages;
