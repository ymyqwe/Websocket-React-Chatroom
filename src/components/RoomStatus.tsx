import React from 'react';

const RoomStatus = (props) => {
  return (
    <div className="room-status">
      在线人数: {props.onlineCount}, 在线列表: {props.userhtml}
    </div>
  );
};
export default RoomStatus;
