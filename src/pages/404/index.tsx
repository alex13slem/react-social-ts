import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { useRouteError } from 'react-router-dom';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const PageNotFound: FC<Props> = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <main className={css.root}>
      <h2>404</h2>
      <h1>Такой страницы не существует</h1>
    </main>
  );
};

export default PageNotFound;
