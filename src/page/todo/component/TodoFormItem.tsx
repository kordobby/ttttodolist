import { useContext, useState } from 'react';
import TodoProvider, { TodoEntity } from '../../../server/TodoProvider';
import { FormItemType } from '../type';
import { TodoContext } from '..';
import Input from '../../../component/core/control/Input';
import Button from '../../../component/core/control/Button';

const initialErrorState: FormItemType<boolean> = {
  title: false,
  content: false,
};

interface TodoListItemProps {
  data: TodoEntity;
}

export function TodoListItem(props: TodoListItemProps) {
  const { data } = props;
  const { setter } = useContext(TodoContext);

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
    setter(response);
    toggleUpdateMode();
  };

  if (isUpdateMode) {
    return (
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
    );
  }
  return (
    <div>
      <span>{data.title} - </span>
      <span>{data.content}</span>
      <Button onClick={toggleUpdateMode}>수정</Button>
    </div>
  );
}
