import { ComponentProps, FC, HTMLAttributes } from 'react';
import { Outlet } from 'react-router-dom';
import css from './style.module.css';
import Header from '../header';
import Aside from '../aside';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const BaseLayout: FC<Props> = () => {
  return (
    <div className={css.root}>
      <Header />
      <Aside />
      <Outlet />
    </div>
  );
};

export default BaseLayout;
