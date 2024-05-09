import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { Form } from 'react-router-dom';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const PageSignup: FC<Props> = () => {
  return (
    <main className={css.root}>
      <h1>Регистрация</h1>
      <Form
        action="/signup"
        method="post"
        className={css['form']}
        navigate={false}
      >
        <input
          className={css['field']}
          type="text"
          placeholder="Имя"
          name="name"
          required
          onInvalid={(e) =>
            (e.target as HTMLInputElement).setCustomValidity(
              'Вы забыли ввести имя'
            )
          }
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
        />
        <input
          className={css['field']}
          type="text"
          name="city"
          placeholder="Город"
          required
          onInvalid={(e) =>
            (e.target as HTMLInputElement).setCustomValidity(
              'Вы забыли ввести город'
            )
          }
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
        />
        <input
          className={css['field']}
          type="number"
          name="age"
          placeholder="Возраст"
          min={6}
          required
          onInvalid={(e) =>
            (e.target as HTMLInputElement).setCustomValidity(
              'Вы забыли ввести возраст'
            )
          }
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
        />
        <button type="submit">Зарегистрироваться</button>
      </Form>
    </main>
  );
};

export default PageSignup;
