import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { Hobby } from '../../types/hobby';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {
  hobbies: Hobby[];
}

const UserDetail: FC<Props> = ({ hobbies }) => {
  return (
    <article className={css['root']}>
      <h3>Хобби</h3>
      <ul className={css['hobbies']}>
        {hobbies.map((hobby) => (
          <li key={hobby.slug} className={css['hobby']}>
            {hobby.name}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default UserDetail;
