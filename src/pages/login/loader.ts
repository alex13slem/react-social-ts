import localforage from 'localforage';
import { json, redirect } from 'react-router-dom';
import client from '../../api/client';
import { User } from '../../types/user';

async function loader() {
  const currUserId = (await localforage.getItem('currUserId')) ?? null;
  if (currUserId) return redirect('/');

  const users = await client.get<User[]>('/users');

  return json({ users }, { status: 200 });
}

export default loader;
