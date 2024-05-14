import localforage from 'localforage';
import { ActionFunctionArgs, json } from 'react-router-dom';
import client from '../../../api/client';
import { User } from '../../../types/user';

async function action({ params }: ActionFunctionArgs) {
  if (!params.id) {
    throw new Response('Invalid request', { status: 400 });
  }
  const currUserId = await localforage.getItem('currUserId');
  const currUser = await client.get<User>('/users/' + currUserId);

  const data = {
    ...currUser,
    friends: [...currUser.friends, { id: params.id }],
  };

  try {
    const res = await client.patch(`/users/${currUser.id}`, data);
    return json(res, { status: 200 });
  } catch (error) {
    throw new Response('Error adding friend', { status: 500 });
  }
}

export default action;
