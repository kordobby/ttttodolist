import { TodoListItem } from './TodoListItem';
import Loading from './Loading';
import * as UI from '../style/TodoList.style';
import { useTodoContext } from '../context/useTodoContext';

type TodoListCategoryType = 'active' | 'done';
interface TodoListProps {
  category: TodoListCategoryType;
}

function TodoList(props: TodoListProps) {
  const { todoList, loading } = useTodoContext();
  const isActiveList = props.category === 'active';
  const listData = todoList.filter((value) =>
    props.category === 'active' ? value.done === false : value.done === true
  );
  const isEmptyList = listData.length === 0;
  return (
    <UI.ListLayout>
      <h3>{isActiveList ? '✋🏻 TODO' : '👩🏻‍🌾 DONE'}</h3>
      <Loading loading={loading}>
        <ul>
          {isEmptyList && <h4>is Empty!</h4> }
          {listData.map((value) => (
            <li key={value.id} id={value.id}>
              <UI.ListItemBox>
                <TodoListItem data={value}/>
              </UI.ListItemBox>
            </li>
          ))}
        </ul>
      </Loading>
    </UI.ListLayout>
  );
}

export default TodoList;