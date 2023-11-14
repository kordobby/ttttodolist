import { useCallback, useEffect, useState } from 'react';
import TodoProvider, { TodoEntity } from '../../../server/TodoProvider';

export const useGetTodo = (): [
  TodoEntity[],
  React.Dispatch<React.SetStateAction<TodoEntity[]>>,
  boolean,
] => {
  const [todoList, setTodoList] = useState<TodoEntity[]>([]);
  const [initLoading, setInitLoading] = useState<boolean>(false);

  const getTodoList = useCallback(async () => {
    const response = await TodoProvider.getTodos();
    setInitLoading(false);
    setTodoList(response);
  }, [setTodoList]);

  useEffect(() => {
    setInitLoading(true);
    getTodoList();
  }, [getTodoList]);

  return [todoList, setTodoList, initLoading];
};
