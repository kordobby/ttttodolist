import TodoForm from './component/TodoForm';
import TodoList from './component/TodoList';
import * as UI from './style/index';
import { useGetTodo } from './hook/useGetTodo';
import { createContext } from 'react';
import { TodoEntity } from '../../server/TodoProvider';

interface TodoContextType {
  todoList: TodoEntity[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoEntity[]>>;
  loading: boolean;
}

export const TodoContext = createContext<TodoContextType | null>(null);
function TodoPage() {
  const [todoList, setTodoList, initLoading] = useGetTodo();

  return (
    <UI.Layout>
      <TodoContext.Provider value={{ todoList, setTodoList, loading: initLoading }}>
        <TodoForm />
        <TodoList category="active" />
        <TodoList category="done" />
      </TodoContext.Provider>
    </UI.Layout>
  );
}

export default TodoPage;
