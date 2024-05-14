import localforage from 'localforage';
import { redirect } from 'react-router-dom';

async function action() {
  try {
    await localforage.removeItem('currUserId');
    return redirect('/');
  } catch (error) {
    return new Response('Error logging out', { status: 500 });
  }
}

export default action;
