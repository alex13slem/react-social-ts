import { json } from 'react-router-dom';
import client from '../../api/client';
import { Hobby } from '../../types/hobby';
import { User } from '../../types/user';

const loader = async () => {
  const user = await client.get<User>('/users/1');
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
