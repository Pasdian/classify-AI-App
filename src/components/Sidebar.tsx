import Link from 'next/link';
import { BotMessageSquare, PencilLine, SearchIcon } from 'lucide-react';
function Sidebar() {
  return (
    <div className='bg-white  text-white p-5'>
      <ul className='gap-5 flex lg:flex-col'>
        <li className='flex-1'>
          <Link
            href='/create-chat'
            className='hover:opacity-90 flex flex-col text-center lg:text-left 
          lg:flex-row items-center gap-2 p-5 rounded-md bg-primary'
          >
            <BotMessageSquare className='h-6 w-6 lg:h-8 lg:w-8' />
            <div className='hidden md:inline'>
              <p className='text-xl'>Create</p>
              <p className='text-sm font-extralight'>New Chat</p>
            </div>
          </Link>
        </li>
        <li className='flex-1'>
          <Link
            href='/view-chats'
            className='hover:opacity-90 flex flex-col text-center lg:text-left 
          lg:flex-row items-center gap-2 p-5 rounded-md bg-primary'
          >
            <PencilLine className='h-6 w-6 lg:h-8 lg:w-8' />
            <div className='hidden md:inline'>
              <p className='text-xl'>Edit</p>
              <p className='text-sm font-extralight'>Chats</p>
            </div>
          </Link>
        </li>
        <li className='flex-1'>
          <Link
            href='/review-sessions'
            className='hover:opacity-90 flex flex-col text-center lg:text-left 
          lg:flex-row items-center gap-2 p-5 rounded-md bg-primary'
          >
            <SearchIcon className='h-6 w-6 lg:h-8 lg:w-8' />
            <div className='hidden md:inline'>
              <p className='text-xl'>View</p>
              <p className='text-sm font-extralight'>Sessions</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default Sidebar;
