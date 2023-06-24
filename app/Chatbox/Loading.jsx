import Spinner from "../components/Spinner";

export default function Loading() {
  return (
    <div className='absolute left-1/2 -translate-x-1/2 top-1/2'>
      <Spinner size='w-20 h-20 mx-auto' />
    </div>
  );
}
