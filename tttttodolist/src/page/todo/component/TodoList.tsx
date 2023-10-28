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
    <>
      {data.map((value) => (
        <span id={value.id}>{value.title}</span>
      ))}
    </>
  );
}

function TodoList(props: TodoPageProps) {
  const { children } = props;
  return <>{children}</>;
}

TodoList.Title = Title;
TodoList.List = List;
export default TodoList;
