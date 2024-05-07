import { LoaderFunctionArgs, json } from 'react-router-dom';
import hobbiesData from '../../data/hobbies.json';
import usersData from '../../data/users.json';

async function loader({ params }: LoaderFunctionArgs) {
  const user = usersData.find((u) => +u.id === Number(params.id));
  if (!user) {
    throw new Response('User not found', { status: 404 });
  }

  const hobbies = user.hobbies.map((slug) =>
    hobbiesData.find((hobby) => hobby.slug === slug)
  );

  return json({ user, hobbies }, { status: 200 });
}

export default loader;
