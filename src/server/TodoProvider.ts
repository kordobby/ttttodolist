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
    setTimeout(() => {
      resolve(response());
    }, 2000);
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

  async function deleteTodo(id: string): Promise<TodoEntity[]> {
    for (let index = 0; index < todolist.length; index++) {
      if (todolist[index].id === id) {
        todolist.splice(index, 1);
      }
    }
    return returnPromise(() => [...todolist]);
  }

  async function modifyDoneState(id: string): Promise<TodoEntity[]> {
    const index = todolist.findIndex((item) => item.id === id);
    todolist[index] = {
      ...todolist[index],
      done: !todolist[index].done,
    };
    return returnPromise(() => [...todolist]);
  }

  async function modifyTodo(request: TodoEntity) {
    for (let index = 0; index < todolist.length; index++) {
      if (todolist[index].id === request.id) {
        todolist[index].title = request.title;
        todolist[index].content = request.content;
      }
    }
    return returnPromise(() => [...todolist]);
  }

  return {
    getTodos,
    createTodo,
    deleteTodo,
    modifyTodo,
    modifyDoneState,
  };
}

export default TodoProvider();
