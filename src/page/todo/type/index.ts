export type FormItemIdType = 'title' | 'content';
export type FormItemInputType = {
  id: FormItemIdType;
  label: string;
};

export interface FormItemType<T> {
  title: T;
  content: T;
}
