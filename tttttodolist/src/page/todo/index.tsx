import TodoForm from './component/TodoForm';
import TodoList from './component/TodoList';
import * as UI from './style/index';
import { useGetTodo } from './hook/useGetTodo';
import { useState } from 'react';
import { TodoEntity } from '../../server/TodoProvider';

function TodoPage() {
  const [todoList, setTodoList] = useState<TodoEntity[]>([]);
  useGetTodo(setTodoList);
  
  return (
    <UI.Layout>
      <TodoForm setTodoList={setTodoList} />
      <TodoList>
        <TodoList.Title>할 일</TodoList.Title>
        <TodoList.List data={todoList} />
      </TodoList>
    </UI.Layout>
  );
}

export default TodoPage;
