import { useCallback, useEffect, useState } from 'react';
import TodoProvider, { TodoEntity } from '../../../server/TodoProvider';

export const useGetTodo = (): [
  TodoEntity[],
  React.Dispatch<React.SetStateAction<TodoEntity[]>>,
] => {
  const [todoList, setTodoList] = useState<TodoEntity[]>([]);

  const onGetTodoList = useCallback(async () => {
    const response = await TodoProvider.getTodos();
    setTodoList(response);
  }, [setTodoList]);

  useEffect(() => {
    onGetTodoList();
  }, [onGetTodoList]);

  return [todoList, setTodoList];
};
