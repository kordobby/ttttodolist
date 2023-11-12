import React, { useContext, useState } from 'react';
import Input from '../../../component/core/control/Input';
import Button from '../../../component/core/control/Button';
import TodoProvider from '../../../server/TodoProvider';
import { FormItemType } from '../type';
import { TodoContext } from '..';

const initialFormItem: FormItemType<string> = {
  title: '',
  content: '',
};

const initialErrorState: FormItemType<boolean> = {
  title: false,
  content: false,
};

function TodoForm() {
  const { setter } = useContext(TodoContext);
  const [formItem, setFormItem] = useState<FormItemType<string>>(initialFormItem);
  const [error, setError] = useState<FormItemType<boolean>>(initialErrorState);
  const btnDisabled = error.title || error.title;

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
    const response = await TodoProvider.createTodo({
      title: formItem.title,
      content: formItem.content,
    });
    setter(response);
  };

  return (
    <form className="todo_form" onSubmit={onSubmit}>
      <Input label={'제목'} $isError={error['title']}>
        <Input.TextField id={'title'} onChange={onChange} />
      </Input>
      <Input label={'내용'} $isError={error['content']}>
        <Input.TextField id={'content'} onChange={onChange} />
      </Input>
      <Button type="submit" disabled={btnDisabled}>
        제출하기
      </Button>
    </form>
  );
}

export default TodoForm;
