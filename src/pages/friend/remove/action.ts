import localforage from 'localforage';
import { ActionFunctionArgs } from 'react-router-dom';
import client from '../../../api/client';
import { User } from '../../../types/user';

async function action({ request, params }: ActionFunctionArgs) {
  if (!params.id) {
    throw new Response('Invalid request', { status: 400 });
  }
  const currUserId = await localforage.getItem('currUserId');
  const currUser = await client.get<User>('/users/' + currUserId);

  let data: User;

  switch (request.method) {
    case 'POST':
      data = {
        ...currUser,
        friends: currUser.friends.filter((u) => u.id !== params.id),
      };
      await client.patch(`/users/${currUser.id}`, data);
      break;

    default:
      throw new Response('Method not allowed', { status: 405 });
  }

  return null;
}

export default action;
