import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { Form, useLoaderData } from 'react-router-dom';
import { User } from '../../types/user';
import { Hobby } from '../../types/hobby';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const PageEdit: FC<Props> = () => {
  const { user, hobbies } = useLoaderData() as {
    user: User;
    hobbies: Hobby[];
  };

  return (
    <main className={css.root}>
      <h1>Редактирование профиля</h1>
      <Form
        action="/edit"
        method="post"
        className={css['form']}
        navigate={false}
      >
        <label className={css['label-field']}>
          <span>Имя:</span>
          <input type="text" name="name" defaultValue={user.name} required />
        </label>
        <label className={css['label-field']}>
          <span>Город:</span>
          <input type="text" name="city" defaultValue={user.city} required />
        </label>
        <label className={css['label-field']}>
          <span>Возраст:</span>
          <input type="number" name="age" defaultValue={user.age} required />
        </label>
        <label className={css['label-field']}>
          <span>Ссылка на аватар:</span>
          <input type="text" name="avatar" defaultValue={user.avatar} />
        </label>
        <div className={css['cb-block']}>
          <span>Хобби</span>
          {hobbies.map((hobby) => (
            <label className={css['label-field']} key={hobby.slug}>
              <input
                type="checkbox"
                name="hobbies"
                value={hobby.slug}
                defaultChecked={user.hobbies.includes(hobby.slug)}
              />
              <span>{hobby.name}</span>
            </label>
          ))}
        </div>
        <button type="submit">Сохранить</button>
      </Form>
    </main>
  );
};

export default PageEdit;
