import React, { PropsWithChildren, useState } from 'react';
import Input from '../../../component/core/control/Input';
import Button from '../../../component/core/control/Button';
import TodoProvider, { TodoEntity } from '../../../server/TodoProvider';

interface FormItemInterface {
  title: string;
  content: string;
  error: boolean;
}

const initialFormItem: FormItemInterface = {
  title: '',
  content: '',
  error: false,
};

interface TodoFormProps extends PropsWithChildren {
  setTodoList: React.Dispatch<React.SetStateAction<TodoEntity[]>>;
}
function TodoForm(props: TodoFormProps) {
  const { setTodoList } = props;
  const [formItem, setFormItem] = useState<FormItemInterface>(initialFormItem);

  const onValidateFormItem = (id: string, value: string) => {
    if (!value || value.trim() === '') {
      setFormItem((prev) => ({ ...prev, error: true }));
      return;
    }
    setFormItem((prev) => ({ ...prev, error: false }));
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
      <Input label="제목">
        <Input.TextField id="title" onChange={onChange} />
      </Input>
      <Input label="내용">
        <Input.TextField id="content" onChange={onChange} />
      </Input>
      <Button type="submit">제출하기</Button>
    </form>
  );
}

export default TodoForm;
