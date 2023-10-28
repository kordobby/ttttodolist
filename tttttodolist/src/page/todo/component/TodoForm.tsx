import React, { PropsWithChildren, useState } from 'react';
import Input from '../../../component/core/control/Input';
import Button from '../../../component/core/control/Button';
import TodoProvider, { TodoEntity } from '../../../server/TodoProvider';
import { FormItemInputType, FormItemType } from '../type';

const initialFormItem: FormItemType<string> = {
  title: '',
  content: '',
};

const initialErrorState: FormItemType<boolean> = {
  title: false,
  content: false,
};

const todoFormItem: FormItemInputType[] = [
  {
    id: 'title',
    label: '제목',
  },
  {
    id: 'content',
    label: '내용',
  },
];

interface TodoFormProps extends PropsWithChildren {
  setTodoList: React.Dispatch<React.SetStateAction<TodoEntity[]>>;
}

function TodoForm(props: TodoFormProps) {
  const { setTodoList } = props;
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
    setTodoList(response);
  };

  return (
    <form className="todo_form" onSubmit={onSubmit}>
      {todoFormItem.map((value) => (
        <Input key={value.id} label={value.label} $isError={error[value.id]}>
          <Input.TextField id={value.id} onChange={onChange} />
        </Input>
      ))}
      <Button type="submit" disabled={btnDisabled}>
        제출하기
      </Button>
    </form>
  );
}

export default TodoForm;
