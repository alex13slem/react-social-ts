import { json } from 'react-router-dom';
import hobbiesData from '../../data/hobbies.json';
import usersData from '../../data/users.json';

const loader = async () => {
  const user = usersData.find((u) => u.id == 1)!;

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
