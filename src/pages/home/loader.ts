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
  const hobbies = user.hobbies.map((slug) =>
    hobbiesData.find((hobby) => hobby.slug === slug)
  );

  return json(
    {
      user,
      hobbies,
    },
    { status: 200 }
  );
};

export default loader;
