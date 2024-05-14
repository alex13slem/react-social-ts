import { createBrowserRouter, redirect } from 'react-router-dom';

import BaseLayout from '../layouts/base';
import PageHome from '../pages/home';
import PageEdit from '../pages/edit';
import PageFriends from '../pages/friends';
import PageFriend from '../pages/friend';
import PageLogin from '../pages/login';
import PageSignup from '../pages/signup';
import PageNotFound from '../pages/404';
import PageChats from '../pages/chats';
import PageChat from '../pages/chat';

import loaderRoot from './loader';
import loaderLogin from '../pages/login/loader';
import loaderHome from '../pages/home/loader';
import loaderFriends from '../pages/friends/loader';
import loaderFriend from '../pages/friend/loader';
import loaderEdit from '../pages/edit/loader';
import loaderChats from '../pages/chats/loader';
import loaderChat from '../pages/chat/loader';

import actionFriendRemove from '../pages/friend/remove/action';
import actionFriendAdd from '../pages/friend/add/action';
import actionLogin from '../pages/login/action';
import actionLogout from '../pages/logout/action';
import actionSignup from '../pages/signup/action';
import actionEdit from '../pages/edit/action';
import actionChat from '../pages/chat/action';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    id: 'root',
    loader: loaderRoot,
    errorElement: <PageNotFound />,
    children: [
      {
        path: 'login',
        element: <PageLogin />,
        loader: loaderLogin,
        children: [
          {
            path: ':id',
            action: actionLogin,
          },
        ],
      },
      {
        path: 'logout',
        loader: () => redirect('/'),
        action: actionLogout,
      },
      {
        path: 'signup',
        element: <PageSignup />,
        action: actionSignup,
      },
      {
        index: true,
        element: <PageHome />,
        loader: loaderHome,
      },
      {
        path: 'edit',
        element: <PageEdit />,
        loader: loaderEdit,
        action: actionEdit,
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
            loader: () => redirect('../'),
          },
          {
            path: 'remove',
            action: actionFriendRemove,
            loader: () => redirect('../'),
          },
        ],
      },
      {
        path: 'chats',
        element: <PageChats />,
        loader: loaderChats,
      },
      {
        path: 'chats/:id',
        element: <PageChat />,
        loader: loaderChat,
        action: actionChat,
      },
    ],
  },
]);

export default router;
