import { PropsWithChildren } from 'react';
import { TodoType } from '../type';

interface TodoPageProps extends PropsWithChildren {}

function Title(props: PropsWithChildren) {
  return <>{props.children}</>;
}

interface TodoListProps extends PropsWithChildren {
  data: TodoType[];
}

function List(props: TodoListProps) {
  const { data } = props;
  
  return (
    <ul>
      {data.map((value) => (
        <li key={value.id} id={value.id}>
          {value.title} - {value.content}
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
