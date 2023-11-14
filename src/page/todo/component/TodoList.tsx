import { TodoListItem } from './TodoListItem';
import Loading from './Loading';
import styled from 'styled-components';
import { useTodoContext } from '../context/useTodoContext';

interface TodoListProps {
  listType: 'active' | 'done';
}

function TodoList(props: TodoListProps) {
  const { state, loading } = useTodoContext();
  const isActiveList = props.listType === 'active';
  const listData = state.filter((value) =>
    props.listType === 'active' ? value.done === false : value.done === true
  );
  const isEmptyList = listData.length === 0;
  return (
    <ListLayout>
      <h3>{isActiveList ? '✋🏻 TODO' : '👩🏻‍🌾 DONE'}</h3>
      <Loading loading={loading}>
        <ul>
          {isEmptyList && <h4>is Empty!</h4> }
          {listData.map((value) => (
            <li key={value.id} id={value.id}>
              <ListItemBox>
                <TodoListItem data={value}/>
              </ListItemBox>
            </li>
          ))}
        </ul>
      </Loading>
    </ListLayout>
  );
}

export default TodoList;

const ListLayout = styled.div`
  padding: 15px 40px;
`;

const ListItemBox = styled.div`
  display: flex;
  gap: 5px;
  span {
    margin-right: 10px;
  }
  margin-bottom: 8px;
`;
