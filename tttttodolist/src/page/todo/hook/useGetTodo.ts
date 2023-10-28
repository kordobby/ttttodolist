import React, { useCallback, useEffect } from 'react';
import TodoProvider, { TodoEntity } from '../../../server/TodoProvider';

export const useGetTodo = (setTodoList: React.Dispatch<React.SetStateAction<TodoEntity[]>>) => {
  const onGetTodoList = useCallback(async () => {
    const response = await TodoProvider.getTodos();
    setTodoList(response);
  }, [setTodoList]);

  useEffect(() => {
    onGetTodoList();
  }, [onGetTodoList]);
};
