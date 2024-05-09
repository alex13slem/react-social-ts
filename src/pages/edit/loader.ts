import localforage from 'localforage';
import { json } from 'react-router-dom';
import client from '../../api/client';
import { Hobby } from '../../types/hobby';
import { User } from '../../types/user';

const loader = async () => {
  const currUserId = await localforage.getItem('currUserId');
  if (!currUserId) return null;

  const user = await client.get<User>('/users/' + currUserId);
  const hobbiesData = await client.get<Hobby[]>('/hobbies');

  return json(
    {
      user,
      hobbies: hobbiesData,
    },
    { status: 200 }
  );
};

export default loader;
