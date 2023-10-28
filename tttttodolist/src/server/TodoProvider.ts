import { v4 as uuidv4 } from 'uuid';

interface TodoCreateRequest {
  title: string;
  content: string;
}

export interface TodoEntity {
  id: string;
  title: string;
  content: string;
  done: boolean;
}

const returnPromise = async (response: () => TodoEntity[]): Promise<TodoEntity[]> => {
  return new Promise(function (resolve) {
    resolve(response());
  });
};

function TodoProvider() {
  const todolist: TodoEntity[] = [
    { id: uuidv4(), title: '취뽀하기', content: '열심히 살아', done: false },
  ];

  async function getTodos(): Promise<TodoEntity[]> {
    return returnPromise(() => todolist);
  }

  async function createTodo(request: TodoCreateRequest): Promise<TodoEntity[]> {
    const todo: TodoEntity = {
      id: uuidv4(),
      ...request,
      done: false,
    };
    todolist.push(todo);
    return returnPromise(() => [...todolist]);
  }

  return {
    getTodos,
    createTodo,
  };
}

export default TodoProvider();
