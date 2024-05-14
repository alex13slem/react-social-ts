import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { Link, useLoaderData } from 'react-router-dom';
import { User } from '../../types/user';
import { Message } from '../../types/message';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

interface PreviewMessage extends User {
  lastMessage: Message;
}

const PageChats: FC<Props> = () => {
  const { previewMessages } = useLoaderData() as {
    previewMessages: PreviewMessage[];
  };

  return (
    <main className={css.root}>
      {previewMessages.length === 0 && <h1>Нет никаких сообщений</h1>}
      {previewMessages.map((u) => {
        const [date, time] = new Date(u.lastMessage.createdAt)
          .toLocaleString()
          .split(', ');
        return (
          <Link to={`/chats/${u.id}`} className={css.link}>
            <img src={u.avatar} alt={u.name} />
            <h3>{u.name}</h3>
            <p>{u.lastMessage.text}</p>
            <time dateTime={new Date(u.lastMessage.createdAt).toISOString()}>
              <span>{date}</span> <span>{time}</span>
            </time>
          </Link>
        );
      })}
    </main>
  );
};

export default PageChats;
