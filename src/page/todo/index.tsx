import TodoForm from './component/TodoForm';
import TodoList from './component/TodoList';
import * as UI from './style/index';
import { useGetTodo } from './hook/useGetTodo';
import { createContext, useCallback } from 'react';
import { TodoEntity } from '../../server/TodoProvider';

interface TodoContextType {
  state: TodoEntity[];
  setter: (value: TodoEntity[]) => void;
}

const initialTodoContext: TodoContextType = {
  state: [],
  setter: () => {},
};
export const TodoContext = createContext<TodoContextType>(initialTodoContext);
function TodoPage() {
  const [todoList, setTodoList] = useGetTodo();

  const onSetTodoList: (value: TodoEntity[]) => void = useCallback(
    (value) => {
      setTodoList(value);
    },
    [setTodoList]
  );

  return (
    <UI.Layout>
      <TodoContext.Provider value={{ state: todoList, setter: onSetTodoList }}>
        <TodoForm />
        <TodoList listType="active" />
        <TodoList listType="archived" />
      </TodoContext.Provider>
    </UI.Layout>
  );
}

export default TodoPage;
