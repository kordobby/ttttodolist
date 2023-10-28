import TodoForm from './component/TodoForm';
import TodoList from './component/TodoList';
import * as UI from './style/index';
import { useGetTodo } from './hook/useGetTodo';

function TodoPage() {
  const [todoList, setTodoList] = useGetTodo();

  const todoData = todoList.filter((value) => value.done === false);
  const doneData = todoList.filter((value) => value.done === true);

  return (
    <UI.Layout>
      <TodoForm setTodoList={setTodoList} />
      <TodoList>
        <TodoList.Title>TODO</TodoList.Title>
        <TodoList.List data={todoData} setTodoList={setTodoList} />
      </TodoList>
      <TodoList>
        <TodoList.Title>DONE</TodoList.Title>
        <TodoList.List data={doneData} setTodoList={setTodoList} />
      </TodoList>
    </UI.Layout>
  );
}

export default TodoPage;
