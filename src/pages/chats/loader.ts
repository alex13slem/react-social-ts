import localforage from 'localforage';
import { json } from 'react-router-dom';
import client from '../../api/client';
import { Message } from '../../types/message';
import { User } from '../../types/user';

async function loader() {
  const currUserId = await localforage.getItem('currUserId');
  if (!currUserId) return null;
  let userMessages: Message[] = [];
  let interlocutors: User[] = [];
  try {
    userMessages = (await client.get<Message[]>('/messages')).filter(
      (m) => m.to === currUserId || m.from === currUserId
    );
  } catch (error) {
    throw new Response('Failed to fetch messages', { status: 500 });
  }

  try {
    interlocutors = (await client.get<User[]>('/users')).filter(
      (u) =>
        userMessages.some((m) => m.to === u.id || m.from === u.id) &&
        u.id !== currUserId
    );
  } catch (error) {
    throw new Response('Failed to fetch users', { status: 500 });
  }

  const previewMessages = interlocutors.map((u) => ({
    ...u,
    lastMessage: userMessages
      .filter((m) => m.to === u.id || m.from === u.id)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      .at(-1),
  }));

  return json({ previewMessages }, { status: 200 });
}

export default loader;
