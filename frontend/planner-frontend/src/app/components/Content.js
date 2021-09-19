import React, { useState, useRef, useEffect } from 'react';
import ScheduleAdd from './ScheduleAdd';
import axios from 'axios';

const ToDo = ( { toDo, delToDo } ) => {
    const { id, content } = toDo;
    return(
        <div>
            {content}
            <button onClick={() => delToDo(id)}>삭제</button>
        </div>
    );
}

const Content = () => {
    const [toDos, setToDos] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const numToDos = useRef(0);

    useEffect(() => {
        const fetchUsers = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            setToDos([]);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);
            const response = await axios.get('/api/toDoList');
            setToDos(response.data.map((elem, index) => {
                return({
                    id: index,
                    content: elem
                });
            })); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
            setError(e);
        }
        setLoading(false);
        };
        fetchUsers();
        numToDos.current = toDos.length;
    }, []);

    

    const onClick = (e) => {
        numToDos.current += 1;
        setContent("");
        setToDos([
            ...toDos,
            {
                id: numToDos.current + 1,
                content
            }
        ]);
    };

    const onChange = (e) => {
        const value = e.target.value;
        setContent(value);
    };
    const delToDo = (id) => {
        setToDos(toDos.filter(toDo => toDo.id !== id))
        axios.get('/api/toDoList');
    }
    const onSave = () => {
        const toDoList = JSON.stringify(toDos.map(elem => {
            return(
                elem.content
            );
        }));
        axios.post('/api/toDoList', toDoList, {
            headers: {
            'Content-Type': 'application/json'
          }
        });
    }
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!toDos) return null;

    return (
        <div className="class-container">
            <ScheduleAdd onClick={onClick} onChange={onChange} content={content} />
            {toDos.map(toDo=><ToDo key={toDo.id} toDo={toDo} delToDo={delToDo} />)}
            <button onClick={onSave}>저장</button>
        </div>
    );
};

export default Content;