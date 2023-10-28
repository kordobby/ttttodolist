import TodoForm from './component/TodoForm';
import TodoList from './component/TodoList';
import * as UI from './style/index';
import { useState } from 'react';
import { TodoType } from './type';
import Button from '../../component/core/control/Button';

function TodoPage() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  return (
    <UI.Layout>
      <TodoForm>
        <Button type="submit" />
      </TodoForm>
      <TodoList>
        <TodoList.Title>할 일</TodoList.Title>
        <TodoList.List data={todos} />
      </TodoList>
    </UI.Layout>
  );
}

export default TodoPage;
