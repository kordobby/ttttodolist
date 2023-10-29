import { PropsWithChildren, useState } from 'react';
import Button from '../../../component/core/control/Button';
import TodoProvider, { TodoEntity } from '../../../server/TodoProvider';
import { FormItemType } from '../type';
import Input from '../../../component/core/control/Input';

const initialErrorState: FormItemType<boolean> = {
  title: false,
  content: false,
};

interface TodoPageProps extends PropsWithChildren {}

function Title(props: PropsWithChildren) {
  return <>{props.children}</>;
}

interface TodoListItemProps extends PropsWithChildren {
  data: TodoEntity;
  setTodoList: React.Dispatch<React.SetStateAction<TodoEntity[]>>;
}
function TodoListItem(props: TodoListItemProps) {
  const { data, setTodoList } = props;
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [formItem, setFormItem] = useState<FormItemType<string>>({
    title: data.title,
    content: data.content,
  });
  const [error, setError] = useState<FormItemType<boolean>>(initialErrorState);
  const btnDisabled = error.title || error.title;

  const toggleUpdateMode = () => {
    setIsUpdateMode((prev) => !prev);
  };

  const onValidateFormItem = (key: string, value: string) => {
    if (!value || value.trim() === '') {
      setError((prev) => ({ ...prev, [key]: true }));
      return;
    }
    setError((prev) => ({ ...prev, [key]: false }));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const id = event.target.id;

    onValidateFormItem(id, value);
    setFormItem((prev) => ({ ...prev, [id]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await TodoProvider.modifyTodo({
      id: data.id,
      title: formItem.title,
      content: formItem.content,
      done: data.done,
    });
    setTodoList(response);
    toggleUpdateMode();
  };

  return (
    <div>
      {isUpdateMode ? (
        <form onSubmit={onSubmit}>
          <Input>
            <Input.TextField id={'title'} onChange={onChange} defaultValue={data.title} />
          </Input>
          <Input>
            <Input.TextField id={'content'} onChange={onChange} defaultValue={data.content} />
          </Input>
          <Button type="submit" disabled={btnDisabled}>
            저장
          </Button>
          <Button type="submit" onClick={toggleUpdateMode}>
            취소
          </Button>
        </form>
      ) : (
        <>
          <span>{data.title} - </span>
          <span>{data.content}</span>
          <Button onClick={toggleUpdateMode}>수정</Button>
        </>
      )}
    </div>
  );
}

interface TodoListProps extends PropsWithChildren {
  data: TodoEntity[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoEntity[]>>;
}

function List(props: TodoListProps) {
  const { data, setTodoList } = props;

  const onDelete = async (id: string) => {
    const response = await TodoProvider.deleteTodo(id);
    setTodoList(response);
  };

  const onModify = async (id: string) => {
    const response = await TodoProvider.modifyDoneState(id);
    setTodoList(response);
  };

  return (
    <ul>
      {data.map((value) => (
        <li key={value.id} id={value.id}>
          <TodoListItem data={value} setTodoList={setTodoList} />
          <Button onClick={() => onDelete(value.id)}>삭제</Button>
          <Button onClick={() => onModify(value.id)}>완료</Button>
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
