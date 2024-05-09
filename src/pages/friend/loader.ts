import { LoaderFunctionArgs, json } from 'react-router-dom';
import client from '../../api/client';
import { Hobby } from '../../types/hobby';
import { User } from '../../types/user';

async function loader({ params }: LoaderFunctionArgs) {
  const user = await client.get<User>(`/users/${params.id}`);
  if (!user) {
    throw new Response('User not found', { status: 404 });
  }
  const hobbiesData = await client.get<Hobby[]>('/hobbies');

  const hobbies = user.hobbies.map((slug) =>
    hobbiesData.find((hobby) => hobby.slug === slug)
  );

  return json({ user, hobbies }, { status: 200 });
}

export default loader;
