import localforage from 'localforage';
import { ActionFunctionArgs, json } from 'react-router-dom';
import client from '../../../api/client';
import { User } from '../../../types/user';

async function action({ request, params }: ActionFunctionArgs) {
  if (!params.id) {
    throw new Response('Invalid request', { status: 400 });
  }
  const currUserId = await localforage.getItem('currUserId');
  const currUser = await client.get<User>('/users/' + currUserId);

  let data: User;
  let res: User;

  switch (request.method) {
    case 'POST':
      try {
        data = {
          ...currUser,
          friends: [...currUser.friends, { id: params.id }],
        };
        res = await client.patch(`/users/${currUser.id}`, data);
        return json(res, { status: 200 });
      } catch (error) {
        throw new Response('Error adding friend', { status: 500 });
      }

    default:
      throw new Response('Method not allowed', { status: 405 });
  }
}

export default action;
