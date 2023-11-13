import { useCallback, useEffect, useState } from 'react';
import TodoProvider, { TodoEntity } from '../../../server/TodoProvider';

export const useGetTodo = (): [
  TodoEntity[],
  React.Dispatch<React.SetStateAction<TodoEntity[]>>,
  boolean
] => {
  const [todoList, setTodoList] = useState<TodoEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const onGetTodoList = useCallback(async () => {
    const response = await TodoProvider.getTodos();
    setLoading(false);
    setTodoList(response);
  }, [setTodoList]);

  useEffect(() => {
    setLoading(true);
    onGetTodoList();
  }, [onGetTodoList]);

  return [todoList, setTodoList, loading];
};
