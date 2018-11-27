import React, {Component} from 'react';

export default class RoomStatus extends Component {
  render() {
    return (<div className="room-status">在线人数: {this.props.onlineCount}, 在线列表: {this.props.userhtml}</div>);
  }
}
