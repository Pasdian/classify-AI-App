import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='p-10 bg-white m-10 rounded-md w-full'>
      <h1 className='text-4xl font-light'>
        Welcome to <span className='text-yellow-500 font-semibold'>Classify</span>
      </h1>
      <h2 className='mt-2 mb-10'>
        Your customisable AI chat agent that helps you in your logistic needs.
      </h2>
      <Link href='/create-chat' />
      <Button>Lets get started by creating your first chat.</Button>
    </main>
  );
}
