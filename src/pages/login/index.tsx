import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { Form, Link, useLoaderData } from 'react-router-dom';
import { User } from '../../types/user';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const PageLogin: FC<Props> = () => {
  const { users } = useLoaderData() as { users: User[] };
  return (
    <main className={css.root}>
      <h1>Добро пожаловать</h1>
      <div className={css['grid']}>
        {users.map((user) => (
          <Form
            key={user.id}
            action={`/login/${user.id}`}
            method="post"
            navigate={false}
          >
            <button type="submit" key={user.id} className={css['user-item']}>
              <img src={user.avatar} alt={user.name} />
              <h2>{user.name}</h2>
            </button>
          </Form>
        ))}
        <Link to={'/signup'}>
          <button className={css['btn-create']} type="submit">
            Создать аккаунт
          </button>
        </Link>
      </div>
    </main>
  );
};

export default PageLogin;
