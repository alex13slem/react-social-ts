import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { User } from '../../types/user';
import { Link } from 'react-router-dom';
import { useCurrUserId } from '../../hooks/useCurrUserId';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {
  user: User;
  href?: string;
}

const UserCard: FC<Props> = ({ user, href = '' }) => {
  const { name, city, age, avatar } = user;
  const { currUserId } = useCurrUserId();

  const Tag = href ? Link : 'article';
  return (
    <Tag to={href} className={css['root']}>
      <div className={css['avatar']}>
        <img src={avatar} alt={name} />
      </div>

      <div className={css['info']}>
        <h3>{name}</h3>
        <p>
          <i>Город:</i> {city}
        </p>
        <p>
          <i>Возраст:</i> {age}
        </p>
      </div>

      {currUserId && currUserId === +user.id && (
        <div className={css['controls']}>
          <Link to={`/edit`}>
            <button>Редактировать</button>
          </Link>
        </div>
      )}
    </Tag>
  );
};

export default UserCard;
