import { useSelector } from 'react-redux';
import InputForm from './components/InputForm';
import TodoList from './components/TodoList';

function App() {
  const name = useSelector((store) => store.counterSSS.name);
  const { status, error } = useSelector((store) => store.todoSlice);
  const todos = useSelector((store) => store.todoSlice.todos);

  return (
    <div className="App">
      <h3>Redux toolkit test</h3>
      <h3>Username is: {name}</h3>
      <InputForm />
      {(status === 'loading' && <h2>Loading...</h2>) ||
        (todos.length === 0 && <h3>No todos in list yet</h3>)}

      {error && <h2>Error happened : {error}</h2>}
      <TodoList />
    </div>
  );
}

export default App;
