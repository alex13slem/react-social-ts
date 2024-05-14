import { ComponentProps, FC, HTMLAttributes } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import css from './style.module.css';
import Header from '../header';
import Aside from '../aside';

export type RootContextType = { currUserId: string | null };

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {
  isNotAuth?: boolean;
}

const BaseLayout: FC<Props> = () => {
  const { currUserId } = useLoaderData() as { currUserId: string };

  return (
    <div className={css.root}>
      <Header />
      {currUserId && <Aside />}
      <Outlet context={{ currUserId } satisfies RootContextType} />
    </div>
  );
};

export default BaseLayout;
