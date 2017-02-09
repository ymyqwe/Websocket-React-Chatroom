import React, { Component, PropTypes } from 'react';

export default class Messages extends Component {
    render() {
        const myId = this.props.myId;
        const oneMessage = this.props.messages.map(function(message){
            return(
                    <Message key={message.msgId} msgType={message.type} msgUser={message.username} action={message.action} isMe={(myId == message.uid)? true : false} time={message.time}/>
                )
        })
        return(<div>{oneMessage}</div>)
    }
}

class Message extends Component {
    render() {
        if (this.props.msgType == 'system') {
            return (
                <div className="one-message system-message">
                    <p className="time">{this.props.time}</p>
                    {this.props.msgUser} {(this.props.action=='login')? '进入了聊天室': '离开了聊天室'}
                </div>
            )
        } else {
                return (
                    <div className={(this.props.isMe)? 'me one-meesage':'other one-messge'}>
                        <p className="time">{this.props.time}</p>
                        <div>
                            <span>{this.props.msgUser}</span>
                            <div>{this.props.action}</div>
                        </div>
                    </div>
                )
        }
    }
}