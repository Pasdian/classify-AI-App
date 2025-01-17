import { serverClient } from '@/lib/server/serverClient';
import { auth } from '@clerk/nextjs/server';
import { GET_CHATS_BY_USER } from '../../../../graphql/queries';
import { GetChatsByUserData, GetChatsByUserDataVariables, Chat } from '../../../../types/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Avatar from '@/components/Avatar';

export const dynamic = 'force-dynamic';

async function ViewChats() {
  const { userId } = await auth();
  if (!userId) return;

  // Get chats of user
  const {
    data: { chatsByUser },
  } = await serverClient.query<GetChatsByUserData, GetChatsByUserDataVariables>({
    query: GET_CHATS_BY_USER,
    variables: {
      clerk_user_id: userId,
    },
  });

  const sortedChatsByUser: Chat[] = [...chatsByUser].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className='flex-1 pb-2 p-10'>
      <h1 className='text-xl lg:text-3xl font-semibold mb-5'>Active Chats</h1>

      {sortedChatsByUser.length === 0 && (
        <div>
          <p>You have not created any chats yet, Click on the button below to create a new one</p>
          <Link href={'/create-chatbot'}>
            <Button className='text-white p-3 rounded-md mt-5'>Create Chat</Button>
          </Link>
        </div>
      )}

      <ul className='flex flex-col space-y-5'>
        {sortedChatsByUser.map((chat) => (
          <Link key={chat.id} href={`/edit-chat/${chat.id}`}>
            <li className='relative p-10 border rounded-md max-w-3xl bg-white'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center space-x-4'>
                  <Avatar seed={chat.name} />
                  <h2 className='text-xl font-bold'>{chat.name}</h2>
                </div>
                <p className='absolute top-5 right-5 text-xs text-gray-400'>
                  Created: {new Date(chat.created_at).toLocaleString()}
                </p>
              </div>
              <hr className='mt-2' />
              <div className='grid grid-cols-2 gap-10 md:gap-5 p-5'>
                <h3 className='italic'>Characteristics:</h3>
                <ul className='text-xs'>
                  {!chat.chatbot_characteristics.length && <p>No characteristics added yet.</p>}
                  {chat.chatbot_characteristics.map((characteristic) => (
                    <li className='list-disc break-words' key={characteristic.id}>
                      {characteristic.content}
                    </li>
                  ))}
                </ul>
                <h3 className='italic'>No of Sessions:</h3>
                <p className='text-sm'>{chat.chat_session.length}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
export default ViewChats;
