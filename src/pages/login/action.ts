import localforage from 'localforage';
import { ActionFunctionArgs } from 'react-router-dom';

async function action({ params }: ActionFunctionArgs) {
  if (!params.id) {
    throw new Response('Invalid request', { status: 400 });
  }

  try {
    localforage.setItem('currUserId', params.id);
    return new Response(null, { status: 200 });
  } catch (error) {
    throw new Response('Error logging in', { status: 500 });
  }
}

export default action;
