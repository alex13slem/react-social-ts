import localforage from 'localforage';
import { ActionFunctionArgs } from 'react-router-dom';

async function action({ request, params }: ActionFunctionArgs) {
  if (!params.id) {
    throw new Response('Invalid request', { status: 400 });
  }
  switch (request.method) {
    case 'POST':
      try {
        localforage.setItem('currUserId', params.id);
        return new Response(null, { status: 200 });
      } catch (error) {
        throw new Response('Error logging in', { status: 500 });
      }

    default:
      throw new Response('Method not allowed', { status: 405 });
  }
}

export default action;
