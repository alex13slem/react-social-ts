import localforage from 'localforage';
import { LoaderFunctionArgs, json } from 'react-router-dom';
import client from '../../api/client';
import { Message } from '../../types/message';
import { User } from '../../types/user';

async function loader({ params }: LoaderFunctionArgs) {
  const currUserId = await localforage.getItem('currUserId');
  const currUser = await client.get<User>('/users/' + currUserId);
  const user = await client.get<User>(`/users/${params.id}`);
  const messages = (await client.get<Message[]>(`/messages`))
    .filter(
      (m) =>
        (m.from === currUserId && m.to === params.id) ||
        (m.to === currUserId && m.from === params.id)
    )
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
    .map((m) => ({
      ...m,
      user: m.from === currUserId ? user : currUser,
    }));

  const messagesPerDay = messages.reduce((acc, m) => {
    const date = new Date(m.createdAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(m);
    return acc;
  }, {} as { [key: string]: Message[] });

  console.log(messagesPerDay);

  return json({ messagesPerDay }, { status: 200 });
}

export default loader;
