import { ComponentProps, FC, HTMLAttributes, useEffect, useState } from 'react';
import css from './style.module.css';
import { useLoaderData } from 'react-router-dom';
import FriendCard from '../../components/friend-card';
import { User } from '../../types/user';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const PageFriends: FC<Props> = () => {
  const { users } = useLoaderData() as { users: User[] };
  const [sUser, setSUser] = useState('');
  const [displayUsers, setDisplayUsers] = useState(users);

  useEffect(() => {
    const filterUsers = users.filter((user) =>
      user.name.toLowerCase().includes(sUser.toLowerCase())
    );
    setDisplayUsers(filterUsers);
  }, [sUser, users]);
  return (
    <main className={css.root}>
      <input
        className={css['search-input']}
        type="text"
        placeholder="Поиск пользователя"
        onChange={(e) => setSUser(e.target.value)}
        value={sUser}
      />
      {displayUsers.length === 0 && <p>Пользователь не найден</p>}
      {displayUsers.map((user) => (
        <FriendCard key={user.id} user={user} href={'/friends/' + user.id} />
      ))}
    </main>
  );
};

export default PageFriends;
