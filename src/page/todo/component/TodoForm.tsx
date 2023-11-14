import React, { useState } from 'react';
import Input from '../../../component/core/control/Input';
import Button from '../../../component/core/control/Button';
import TodoProvider from '../../../server/TodoProvider';
import { FormItemType } from '../type';
import * as UI from '../style/TodoForm.style';
import { useTodoContext } from '../context/useTodoContext';

const initialFormItem: FormItemType<string> = {
  title: '',
  content: '',
};

const initialErrorState: FormItemType<boolean> = {
  title: false,
  content: false,
};

function TodoForm() {
  const { setTodoList } = useTodoContext();
  const [formItem, setFormItem] = useState<FormItemType<string>>(initialFormItem);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FormItemType<boolean>>(initialErrorState);
  const btnDisabled = error.title || error.title || loading;

  const handleValidateForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const key = event.target.id;

    if (!value || value.trim() === '') {
      setError((prev) => ({ ...prev, [key]: true }));
      return;
    }
    setError((prev) => ({ ...prev, [key]: false }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const id = event.target.id;

    setFormItem((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const response = await TodoProvider.createTodo({
      title: formItem.title,
      content: formItem.content,
    });
    setTodoList(response);
    setFormItem(initialFormItem);
    setLoading(false);
  };

  return (
    <UI.Form className="todo_form" onSubmit={handleSubmit}>
      <Input label={'제목'} $isError={error['title']}>
        <Input.TextField
          id={'title'}
          onChange={(event) => {
            handleChange(event);
            handleValidateForm(event);
          }}
          value={formItem.title}
          disabled={loading}
        />
      </Input>
      <Input label={'내용'} $isError={error['content']}>
        <Input.TextField
          id={'content'}
          onChange={handleChange}
          value={formItem.content}
          disabled={loading}
        />
      </Input>
      <Button type="submit" disabled={btnDisabled}>
        제출하기
      </Button>
    </UI.Form>
  );
}

export default TodoForm;
