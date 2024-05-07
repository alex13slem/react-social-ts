import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const Header: FC<Props> = () => {
  return (
    <header className={css.root}>
      <div className={css.container}>
        <div className={css['site-logo']}>LOGO</div>
      </div>
    </header>
  );
};

export default Header;
