import { PropsWithChildren } from 'react';

interface LoadingProps extends PropsWithChildren {
  loading: boolean;
}

const Loading = (props: LoadingProps) => {
  const { children, loading } = props;
  return <>{loading ? <h3>Loading</h3> : children}</>;
};

export default Loading;
