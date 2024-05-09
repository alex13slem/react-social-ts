import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { User } from '../../types/user';
import UserCard from '../../components/user-card';
import { Hobby } from '../../types/hobby';
import UserDetail from '../../components/user-detail';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {
  user: User;
  hobbies: Hobby[];
}

const SectProfile: FC<Props> = ({ user, hobbies }) => {
  return (
    <section className={css.root}>
      <UserCard user={user} />
      <UserDetail hobbies={hobbies} />
    </section>
  );
};

export default SectProfile;
