import React from 'react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncAddTodo } from '../store/todoSlice';

function InputForm() {
  const [value, setValue] = useState('');
  const [statusValue, setStatus] = useState('To do');
  const inputEl = useRef(null);
  const dispatch = useDispatch();

  const newTodo = {
    value,
    statusValue,
  };

  const handleAddTodo = () => {
    dispatch(asyncAddTodo(newTodo));
    setValue('');
    // inputEl.focus();
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    // console.log(statusValue);
  };

  return (
    <div>
      <input
        placeholder="Enter todo here"
        title="enter value here"
        ref={inputEl}
        type="text"
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
      />
      {/* <h3>is complited:</h3> */}
      {/* <select
        name="status"
        value={statusValue}
        // defaultValue="Todo status:"
        onChange={handleStatusChange}
      >
        <option>To do</option>
        <option>Progress</option>
        <option>Done</option>
      </select> */}

      <div className="calc-block">
        <button onClick={handleAddTodo} className="add-btn">
          Add Todo
        </button>
      </div>
    </div>
  );
}

export default InputForm;
