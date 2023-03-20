import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TiDeleteOutline } from 'react-icons/ti';
import { fetchTodos, asyncDeleteTodo } from '../store/todoSlice';

function TodoList() {
  const todos = useSelector((store) => store.todoSlice.todos);

  const dispatch = useDispatch();

  const handleDelleteTodo = (id) => {
    dispatch(asyncDeleteTodo(id));
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // const handleStatusChange = () => {};

  return (
    <ul>
      {todos.map((todo) => (
        <li key={Math.random()}>
          <span className="item-left">
            {todo.id}. {todo.title}
          </span>
          <span className="item-right">
            {/* <select
              className="item-select"
              value={todo.status}
              onChange={handleStatusChange}
            >
              <option value="">To do</option>
              <option value="">In progress</option>
              <option value="">Done</option>
            </select> */}
            {/* {console.log(todo)} */}
            {/* <span>{todo.status === 'Complited' ? 'Complited' : 'To do'}</span> */}
            {/* <span>statusValue</span> */}
            <TiDeleteOutline
              className="delete"
              onClick={() => handleDelleteTodo(todo.id)}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
