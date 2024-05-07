import { createBrowserRouter } from 'react-router-dom';

import BaseLayout from '../layouts/base';
import PageHome from '../pages/home';
import PageFriends from '../pages/friends';

import loaderHome from '../pages/home/loader';
import loaderFriends from '../pages/friends/loader';
import loaderFriend from '../pages/friend/loader';
import PageFriend from '../pages/friend';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <PageHome />,
        loader: loaderHome,
      },
      {
        path: 'friends',
        element: <PageFriends />,
        loader: loaderFriends,
      },
      {
        path: '/friends/:id',
        loader: loaderFriend,
        element: <PageFriend />,
      },
      {
        path: 'chat',
        element: <main>chat</main>,
      },
    ],
  },
]);

export default router;
