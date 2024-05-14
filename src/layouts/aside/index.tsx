import { ComponentProps, FC, HTMLAttributes } from 'react';
import { NavLink } from 'react-router-dom';
import css from './style.module.css';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const Aside: FC<Props> = () => {
  return (
    <aside className={css.root}>
      <nav className={css.nav}>
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/friends">Друзья</NavLink>
        <NavLink to="/chats">Чат</NavLink>
      </nav>
    </aside>
  );
};

export default Aside;
