import { PropsWithChildren } from 'react';
import { TodoType } from '../type';
import Button from '../../../component/core/control/Button';
import TodoProvider, { TodoEntity } from '../../../server/TodoProvider';

interface TodoPageProps extends PropsWithChildren {}

function Title(props: PropsWithChildren) {
  return <>{props.children}</>;
}

interface TodoListProps extends PropsWithChildren {
  data: TodoType[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoEntity[]>>;
}

function List(props: TodoListProps) {
  const { data, setTodoList } = props;

  const onDelete = async (id: string) => {
    const response = await TodoProvider.deleteTodo(id);
    setTodoList(response);
  };

  return (
    <ul>
      {data.map((value) => (
        <li key={value.id} id={value.id}>
          {value.title} - {value.content}
          <Button onClick={() => onDelete(value.id)}>삭제하기</Button>
        </li>
      ))}
    </ul>
  );
}

function TodoList(props: TodoPageProps) {
  const { children } = props;
  return <>{children}</>;
}

TodoList.Title = Title;
TodoList.List = List;
export default TodoList;
