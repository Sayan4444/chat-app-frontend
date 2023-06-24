export default function LoggedInUser({ message }) {
  if (!message) return;
  return (
    <div className='self-end bg-sky-200 px-4 py-2 rounded-2xl'>{message}</div>
  );
}
