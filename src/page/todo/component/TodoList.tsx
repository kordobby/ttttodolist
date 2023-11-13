import { PropsWithChildren, useContext } from 'react';
import { TodoContext } from '..';
import { TodoListItem } from './TodoFormItem';
import Loading from './Loading';
import styled from 'styled-components';

interface TodoListProps extends PropsWithChildren {
  listType: 'active' | 'archived';
}

function TodoList(props: TodoListProps) {
  const { state, loading } = useContext(TodoContext);
  const listData = state.filter((value) =>
    props.listType === 'active' ? value.done === false : value.done === true
  );

  return (
    <ListWrapper>
      <h3>{props.listType === 'active' ? 'TODO' : 'ARCHIVED'}</h3>
      <Loading loading={loading}>
        <ul>
          {listData.map((value) => (
            <li key={value.id} id={value.id}>
              <ListBox>
                <TodoListItem data={value}></TodoListItem>
              </ListBox>
            </li>
          ))}
        </ul>
      </Loading>
    </ListWrapper>
  );
}

export default TodoList;

const ListWrapper = styled.div`
  padding: 15px 40px;
`;

const ListBox = styled.div`
  display: flex;
  gap: 5px;
  span {
    margin-right: 10px;
  }
  margin-bottom: 8px;
`;
