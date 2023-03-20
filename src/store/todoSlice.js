import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todoSlice/fetchTodos',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=4'
      );

      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncDeleteTodo = createAsyncThunk(
  'todoSlice/asyncDeleteTodo',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const responce = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!responce.ok) {
        throw new Error('Cannot delete todo on server. Some server error!');
      }

      dispatch(deleteTodo({ id }));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const asyncAddTodo = createAsyncThunk(
  'todoSlice/asyncAddTodo',
  async function (newTodo, { rejectWithValue, dispatch }) {
    try {
      // const isComplited = newTodo.statusValue === 'Complited' ? true : false;
      const todo = {
        userId: 1,
        title: newTodo.value,
        status: newTodo.statusValue,
        completed: false,
      };

      // console.log(value);

      const responce = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo),
        }
      );
      if (!responce.ok) {
        throw new Error('Cannot post new todo on Server!');
      }
      const data = await responce.json();
      console.log(data);

      dispatch(addTodo(newTodo));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const todoSlice = createSlice({
  name: 'todoSlice',
  initialState: {
    todos: [],
    status: null,
    error: null,
    // statusValue: 'To do',
  },
  reducers: {
    addTodo: (state, action) => {
      console.log(action);
      const newTodo = {
        id: state.todos.length + 1,
        title: action.payload.value,
        // status: action.payload.statusValue,
      };
      // console.log(newTodo);
      state.todos.push(newTodo);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
  },

  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'resolve';
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [asyncDeleteTodo.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
