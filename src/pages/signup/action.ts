import localforage from 'localforage';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import client from '../../api/client';
import { User } from '../../types/user';

async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const name = formData.get('name') as string;
  const city = formData.get('city') as string;
  const age = formData.get('age') as string;

  if (!name || !city || !age) {
    throw new Response('Вы не заполнили все обязательные поля', {
      status: 400,
    });
  }

  try {
    const newUser = await client.post<User>('/users', {
      id: Date.now().toString(),
      name,
      city,
      age: +age,
      avatar: '',
      friends: [],
      hobbies: [],
    });
    await localforage.setItem('currUserId', newUser.id);
    return redirect(`/`);
  } catch (error) {
    return new Response('Произошла ошибка при регистрации', { status: 500 });
  }
}

export default action;
