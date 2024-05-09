import { createBrowserRouter } from 'react-router-dom';

import BaseLayout from '../layouts/base';
import PageHome from '../pages/home';
import PageFriends from '../pages/friends';
import PageFriend from '../pages/friend';

import loaderHome from '../pages/home/loader';
import loaderFriends from '../pages/friends/loader';
import loaderFriend from '../pages/friend/loader';

import actionFriendRemove from '../pages/friend/remove/action';
import actionFriendAdd from '../pages/friend/add/action';

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
        children: [
          {
            path: 'add',
            action: actionFriendAdd,
          },
          {
            path: 'remove',
            action: actionFriendRemove,
          },
        ],
      },
      {
        path: 'chat',
        element: <main>chat</main>,
      },
    ],
  },
]);

export default router;
