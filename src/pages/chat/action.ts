import { ActionFunctionArgs, json } from 'react-router-dom';

async function action({ request }: ActionFunctionArgs) {
  return json({ ok: true });
}

export default action;
