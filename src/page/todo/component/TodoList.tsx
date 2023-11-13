import { PropsWithChildren, useContext } from 'react';
import Button from '../../../component/core/control/Button';
import TodoProvider from '../../../server/TodoProvider';
import { TodoContext } from '..';
import { TodoListItem } from './TodoFormItem';
import Loading from './Loading';

interface TodoListProps extends PropsWithChildren {
  listType: 'active' | 'archived';
}

function TodoList(props: TodoListProps) {
  const { state, setter, loading } = useContext(TodoContext);
  const listData = state.filter((value) =>
    props.listType === 'active' ? value.done === false : value.done === true
  );

  const onDelete = async (id: string) => {
    const response = await TodoProvider.deleteTodo(id);
    setter(response);
  };

  const onModify = async (id: string) => {
    const response = await TodoProvider.modifyDoneState(id);
    setter(response);
  };
  return (
    <>
      <h3>{props.listType === 'active' ? 'TODO' : 'ARCHIVED'}</h3>
      <Loading loading={loading}>
      <ul>
        {listData.map((value) => (
          <li key={value.id} id={value.id}>
            <TodoListItem data={value} />
            <Button onClick={() => onDelete(value.id)}>삭제</Button>
            <Button onClick={() => onModify(value.id)}>완료</Button>
          </li>
        ))}
      </ul>
      </Loading>
    </>
  );
}

export default TodoList;
