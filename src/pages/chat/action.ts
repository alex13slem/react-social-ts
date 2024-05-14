import { ActionFunctionArgs, json } from 'react-router-dom';
import client from '../../api/client';
import { Message } from '../../types/message';

async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const text = data.get('message') as string;
  const from = data.get('from') as string;
  const to = data.get('to') as string;
  if (!text || !from || !to) {
    throw new Response('Error sending message', { status: 400 });
  }
  const message: Message = {
    from,
    to,
    text,
    createdAt: new Date().toISOString(),
  };
  try {
    const res = await client.post('/messages', message);
    return json(res, { status: 200 });
  } catch (error) {
    throw new Response('Error sending message', { status: 500 });
  }
}

export default action;
