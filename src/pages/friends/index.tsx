import { ComponentProps, FC, HTMLAttributes, useEffect, useState } from 'react';
import css from './style.module.css';
import { Form, useLoaderData } from 'react-router-dom';
import FriendCard from '../../components/user-card';
import { User } from '../../types/user';
import { PajamasRemove } from '../../components/svg/pajamas-remove';
import { MaterialSymbolsAdd } from '../../components/svg/material-symbols-add';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const PageFriends: FC<Props> = () => {
  const { userFriends, otherUsers } = useLoaderData() as {
    userFriends: User[];
    otherUsers: User[];
  };

  const [sUser, setSUser] = useState('');
  const [displayFriends, setDisplayFriends] = useState<User[]>(userFriends);
  const [displayOtherUsers, setDisplayOtherUsers] =
    useState<User[]>(otherUsers);

  useEffect(() => {
    const filterFriends = userFriends.filter((user) =>
      user.name.toLowerCase().includes(sUser.toLowerCase())
    );
    setDisplayFriends(filterFriends);

    const filterOtherUsers = otherUsers.filter((user) =>
      user.name.toLowerCase().includes(sUser.toLowerCase())
    );
    setDisplayOtherUsers(filterOtherUsers);
  }, [sUser, userFriends, otherUsers]);

  return (
    <main className={css.root}>
      <input
        className={css['search-input']}
        type="text"
        placeholder="Поиск пользователя"
        onChange={(e) => setSUser(e.target.value)}
        value={sUser}
      />
      {displayFriends.length === 0 && displayOtherUsers.length === 0 && (
        <p>Пользователь не найден</p>
      )}
      {!!displayFriends.length && (
        <>
          <h2>Друзья</h2>
          {displayFriends.map((user) => (
            <div className={css['user-card']}>
              <FriendCard
                key={user.id}
                user={user}
                href={'/friends/' + user.id}
              />
              <div className={css['btns']}>
                <Form
                  method="post"
                  action={`/friends/${user.id}/remove`}
                  navigate={false}
                >
                  <button type="submit">
                    <PajamasRemove />
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </>
      )}
      {!!displayOtherUsers.length && (
        <>
          <h2>Остальные пользователи</h2>
          {displayOtherUsers.map((user) => (
            <div className={css['user-card']}>
              <FriendCard
                key={user.id}
                user={user}
                href={'/friends/' + user.id}
              />
              <div className={css['btns']}>
                <Form
                  method="post"
                  action={`/friends/${user.id}/add`}
                  navigate={false}
                >
                  <button type="submit">
                    <MaterialSymbolsAdd />
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </>
      )}
    </main>
  );
};

export default PageFriends;
