import localforage from 'localforage';
import { LoaderFunctionArgs, json, redirect } from 'react-router-dom';

async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  // await localforage.removeItem('currUserId');
  const currUserId = (await localforage.getItem('currUserId')) ?? null;
  if (!currUserId && url.pathname !== '/login' && url.pathname !== '/signup') {
    return redirect('/login');
  }
  return json({ currUserId }, { status: 200 });
}

export default loader;
