import { PropsWithChildren, useState } from 'react';
import Input from '../../../component/core/control/Input';

interface TodoContentType {
  title: string;
  content: string;
}

const initialTodo = {
  title: '',
  content: '',
};

function TodoForm(props: PropsWithChildren) {
  const [todo, setTodo] = useState<TodoContentType>(initialTodo);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.id;
    const value = event.target.value;
    setTodo((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = () => {
    console.log(todo);
  };
  return (
    <form className="todo_form" onSubmit={onSubmit}>
      <Input label="제목">
        <Input.TextField id="title" onChange={onChange} />
      </Input>
      <Input label="내용">
        <Input.TextField id="content" />
      </Input>
      {props.children}
    </form>
  );
}

export default TodoForm;
