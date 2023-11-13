import { PropsWithChildren, useContext, useState } from 'react';
import TodoProvider, { TodoEntity } from '../../../server/TodoProvider';
import { FormItemType } from '../type';
import { TodoContext } from '..';
import Input from '../../../component/core/control/Input';
import Button from '../../../component/core/control/Button';
import styled from 'styled-components';
import Loading from './Loading';

const initialErrorState: FormItemType<boolean> = {
  title: false,
  content: false,
};

interface TodoListItemProps extends PropsWithChildren {
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
  const isModified = formItem.title !== data.title || formItem.content !== data.content;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FormItemType<boolean>>(initialErrorState);
  const btnDisabled = error.title || error.content;

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
    setLoading(true);
    const response = await TodoProvider.modifyTodo({
      id: data.id,
      title: formItem.title,
      content: formItem.content,
      done: data.done,
    });
    setter(response);
    setLoading(false);
    setIsUpdateMode(false);
  };

  const onDelete = async () => {
    setLoading(true);
    const response = await TodoProvider.deleteTodo(data.id);
    setter(response);
    setLoading(false);
  };

  const onModify = async () => {
    setLoading(true);
    const response = await TodoProvider.modifyDoneState(data.id);
    setter(response);
    setLoading(false);
  };

  if (isUpdateMode) {
    return (
      <Loading loading={loading}>
        <StForm onSubmit={onSubmit}>
          <Input>
            <Input.TextField id={'title'} onChange={onChange} defaultValue={data.title} />
          </Input>
          <Input>
            <Input.TextField id={'content'} onChange={onChange} defaultValue={data.content} />
          </Input>
          <Button type="submit" onClick={() => setIsUpdateMode(false)}>
            취소
          </Button>
          {isModified && (
            <Button type="submit" disabled={btnDisabled}>
              저장
            </Button>
          )}
        </StForm>
      </Loading>
    );
  }
  return (
    <Loading loading={loading}>
      <TodoFormItemBox>
        <span>{data.title} - </span>
        <span>{data.content}</span>
        <Button onClick={() => setIsUpdateMode(true)}>수정</Button>
        <Button onClick={onDelete}>삭제</Button>
        <Button onClick={onModify}>{data?.done ? `취소` : `완료`}</Button>
      </TodoFormItemBox>
    </Loading>
  );
}

const TodoFormItemBox = styled.div`
  button {
    margin-right: 5px;
  }
`;

const StForm = styled.form`
  display: flex;
  gap: 5px;
  align-items: center;
`;
