import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { User } from '../../types/user';
import { Link } from 'react-router-dom';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {
  user: User;
  href?: string;
}

const FriendCard: FC<Props> = ({ user, href = '' }) => {
  const { name, city, age, avatar } = user;

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
    </Tag>
  );
};

export default FriendCard;
