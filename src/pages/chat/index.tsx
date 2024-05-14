import { ComponentProps, FC, HTMLAttributes, useEffect, useRef } from 'react';
import css from './style.module.css';
import { useFetcher, useLoaderData, useParams } from 'react-router-dom';
import { Message } from '../../types/message';
import { User } from '../../types/user';
import { formatMessageDate } from '../../utils/formatMessageDate';
import { useCurrUserId } from '../../hooks/useCurrUserId';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

interface PreviewMessage extends Message {
  user: User;
}

const PageChat: FC<Props> = () => {
  const { id: userId } = useParams();
  const { currUserId } = useCurrUserId();
  const { messagesPerDay } = useLoaderData() as {
    messagesPerDay: { [key: string]: PreviewMessage[] };
  };
  const fetcher = useFetcher();

  const messageInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (fetcher.state === 'idle' && messageInput.current) {
      messageInput.current.value = '';
      messageInput.current.scrollIntoView({ block: 'end' });
    }
  }, [fetcher]);

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
                <h3>{m.user.name}</h3>
                <p>{m.text}</p>
                <time dateTime={new Date(m.createdAt).toISOString()}>
                  <span>{new Date(m.createdAt).toLocaleTimeString()}</span>
                </time>
              </div>
            ))}
          </div>
        ))}
      </div>
      <fetcher.Form className={css.form} method="post">
        <input type="hidden" name="from" value={currUserId ?? ''} />
        <input type="hidden" name="to" value={userId ?? ''} />
        <input type="text" name="message" ref={messageInput} />
        <button type="submit">
          {fetcher.state !== 'idle' && fetcher.data ? 'Отправка' : 'Отправить'}
        </button>
      </fetcher.Form>
    </main>
  );
};

export default PageChat;
