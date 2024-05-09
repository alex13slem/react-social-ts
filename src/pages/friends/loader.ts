import localforage from 'localforage';
import { json } from 'react-router-dom';
import client from '../../api/client';
import { User } from '../../types/user';

async function loader() {
  const currUserId = await localforage.getItem('currUserId');
  const usersData = await client.get<User[]>('/users');
  const currUser = usersData.find((u) => parseInt(u.id) === currUserId)!;

  const otherUsers = usersData.filter(
    (u) =>
      parseInt(u.id) !== currUserId &&
      !currUser.friends.some((f) => f.id === parseInt(u.id))
  );
  const userFriends = usersData.filter((u) =>
    currUser.friends.some((f) => f.id === parseInt(u.id))
  );

  return json({ userFriends, otherUsers }, { status: 200 });
}

export default loader;
