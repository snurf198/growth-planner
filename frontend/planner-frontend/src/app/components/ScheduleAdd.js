import React from 'react';

const ScheduleAdd = ({ onClick, onChange, content }) => {
    return (
        <div>
            <input type="text" onChange={onChange} value={content} />
            <button onClick={onClick}>할 일 추가</button>
        </div>
    );
};

export default ScheduleAdd;