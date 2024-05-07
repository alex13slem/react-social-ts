import { json } from 'react-router-dom';
import usersData from '../../data/users.json';

async function loader() {
  const currUser = usersData.find((u) => u.id == 1)!;
  const users = currUser.friends.map((f) =>
    usersData.find((u) => u.id == f.id)
  );

  return json({ users }, { status: 200 });
}

export default loader;
