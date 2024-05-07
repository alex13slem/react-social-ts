import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { useLoaderData } from 'react-router-dom';
import { User } from '../../types/user';
import SectProfile from '../../sections/profile';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const PageHome: FC<Props> = () => {
  const userData = useLoaderData() as { user: User };

  return (
    <main className={css.root}>
      <SectProfile {...userData} />
    </main>
  );
};

export default PageHome;
