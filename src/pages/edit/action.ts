import localforage from 'localforage';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import client from '../../api/client';

async function action({ request }: ActionFunctionArgs) {
  const currUserId = await localforage.getItem('currUserId');
  if (!currUserId) return null;
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const city = formData.get('city') as string;
  const age = formData.get('age') as string;
  const hobbies = formData.getAll('hobbies') as string[];
  const avatar = formData.get('avatar') as string;

  if (!name || !city || !age) {
    throw new Response('Вы не заполнили все обязательные поля', {
      status: 400,
    });
  }

  try {
    await client.patch('/users/' + currUserId, {
      name,
      city,
      age: +age,
      avatar,
      hobbies,
    });
    return redirect(`/`);
  } catch (error) {
    return new Response('Произошла ошибка при редактировании профиля', {
      status: 500,
    });
  }
}

export default action;
