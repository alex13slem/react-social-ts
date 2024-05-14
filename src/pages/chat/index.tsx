import { ComponentProps, FC, HTMLAttributes, useEffect, useRef } from 'react';
import css from './style.module.css';
import { Form, useLoaderData } from 'react-router-dom';
import { Message } from '../../types/message';
import { User } from '../../types/user';
import { formatMessageDate } from '../../utils/formatMessageDate';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

interface PreviewMessage extends Message {
  user: User;
}

const PageChat: FC<Props> = () => {
  const { messagesPerDay } = useLoaderData() as {
    messagesPerDay: { [key: string]: PreviewMessage[] };
  };
  const messageInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (messageInput.current)
      messageInput.current.scrollIntoView({ block: 'end' });
  }, []);
  return (
    <main className={css.root}>
      <div className={css.messages}>
        {!Object.entries(messagesPerDay).length && (
          <h1>Нет никаких сообщений</h1>
        )}

        {Object.entries(messagesPerDay).map(([date, messages]) => (
          <div className={css.day} key={date}>
            <h2 className={css.date}>
              <p>{formatMessageDate(date)}</p>
            </h2>
            {messages.map((m) => (
              <div className={css.link} key={m.createdAt}>
                <img src={m.user.avatar} alt={m.user.name} />
                <p>{m.text}</p>
                <time dateTime={new Date(m.createdAt).toISOString()}>
                  <span>{new Date(m.createdAt).toLocaleTimeString()}</span>
                </time>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Form className={css.form} method="post" navigate={false}>
        <input type="text" ref={messageInput} />
        <button type="submit">Отправить</button>
      </Form>
    </main>
  );
};

export default PageChat;
