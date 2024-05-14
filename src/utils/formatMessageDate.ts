export function formatMessageDate(date: string) {
  const currentDate = new Date().getTime();
  const messageDate = new Date(date).getTime();

  if (
    new Date(currentDate).toLocaleDateString() ===
    new Date(messageDate).toLocaleDateString()
  ) {
    return 'Сегодня';
  } else if (
    currentDate - messageDate <= 24 * 60 * 60 * 1000 &&
    new Date(messageDate).getDate() === new Date(currentDate).getDate() - 1
  ) {
    return 'Вчера';
  } else {
    return date;
  }
}
