import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { Form, useRouteLoaderData } from 'react-router-dom';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const Header: FC<Props> = () => {
  const { currUserId } = useRouteLoaderData('root') as { currUserId: number };

  return (
    <header className={css.root}>
      <div className={css.container}>
        <div className={css['site-logo']}>LOGO</div>
        {currUserId && (
          <Form action="/logout" method="post" navigate={false}>
            <button type="submit">Logout</button>
          </Form>
        )}
      </div>
    </header>
  );
};

export default Header;
