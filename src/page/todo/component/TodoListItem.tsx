import { PropsWithChildren, useState } from 'react';
import TodoProvider, { TodoEntity } from '../../../server/TodoProvider';
import { FormItemType } from '../type';
import Input from '../../../component/core/control/Input';
import Button from '../../../component/core/control/Button';
import * as UI from '../style/TodoListItem.style';
import Loading from './Loading';
import { useTodoContext } from '../context/useTodoContext';

const initialErrorState: FormItemType<boolean> = {
  title: false,
  content: false,
};

interface TodoListItemProps extends PropsWithChildren {
  data: TodoEntity;
}

export function TodoListItem(props: TodoListItemProps) {
  const { id, done, title: initialTitle, content: initialContent } = props.data;
  const { setTodoList } = useTodoContext();

  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FormItemType<boolean>>(initialErrorState);
  const [formItem, setFormItem] = useState<FormItemType<string>>({
    title: initialTitle,
    content: initialContent,
  });

  const isModified = formItem.title !== initialTitle || formItem.content !== initialContent;
  const btnDisabled = error.title || error.content;

  const handleValidateForm = (key: string, value: string) => {
    if (!value || value.trim() === '') {
      setError((prev) => ({ ...prev, [key]: true }));
      return;
    }
    setError((prev) => ({ ...prev, [key]: false }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;

    handleValidateForm(id, value);
    setFormItem((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const response = await TodoProvider.modifyTodo({
      id,
      title: formItem.title,
      content: formItem.content,
      done,
    });
    setTodoList(response);
    setLoading(false);
    setIsUpdateMode(false);
  };

  const handleDeleteTodo = async () => {
    setLoading(true);
    const response = await TodoProvider.deleteTodo(id);
    setTodoList(response);
    setLoading(false);
  };

  const handleToggleDoneStatus = async () => {
    setLoading(true);
    const response = await TodoProvider.modifyDoneState(id);
    setTodoList(response);
    setLoading(false);
  };

  if (isUpdateMode) {
    return (
      <Loading loading={loading}>
        <UI.Form onSubmit={handleSubmit}>
          <Input>
            <Input.TextField id={'title'} onChange={handleChange} defaultValue={initialTitle} />
          </Input>
          <Input>
            <Input.TextField id={'content'} onChange={handleChange} defaultValue={initialContent} />
          </Input>
          <Button type="submit" onClick={() => setIsUpdateMode(false)}>
            ↩️
          </Button>
          {isModified && (
            <Button type="submit" disabled={btnDisabled}>
              💾
            </Button>
          )}
        </UI.Form>
      </Loading>
    );
  }
  return (
    <Loading loading={loading}>
      <UI.FormItemBox>
        <span>{initialTitle} - </span>
        <span>{initialContent}</span>
        {!done && <Button onClick={() => setIsUpdateMode(true)}>✏️</Button>}
        <Button onClick={handleDeleteTodo}>🗑️</Button>
        <Button onClick={handleToggleDoneStatus}>{done ? `❎` : `✅`}</Button>
      </UI.FormItemBox>
    </Loading>
  );
}
