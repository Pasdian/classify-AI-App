import { serverClient } from '@/lib/server/serverClient';
import { GET_CHAT_SESSION_MESSAGES } from '../../../../../graphql/queries';
import {
  GetChatSessionMessagesResponse,
  GetChatSessionMessagesVariables,
} from '../../../../../types/types';
import Messages from '@/components/Messages';

export const dynamic = 'force-dynamic';
async function ReviewSession({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const {
    data: {
      chat_session: {
        created_at,
        message: messages,
        chat: { name },
        guest: { name: guestName, email },
      },
    },
  } = await serverClient.query<GetChatSessionMessagesResponse, GetChatSessionMessagesVariables>({
    query: GET_CHAT_SESSION_MESSAGES,
    variables: { id: parseInt(id as string) },
  });

  return (
    <div className='flex-1 p-10 pb-24'>
      <h1 className='text-xl lg:text-3xl font-semibold'>Session Review</h1>
      <p className='font-light text-xs text-gray-400 mt-2'>
        Started at {new Date(created_at).toLocaleString()}
      </p>
      <h2 className='font-light mt-2'>
        Between {name} &{' '}
        <span className='font-extrabold'>
          {guestName} ({email})
        </span>
      </h2>

      <hr className='my-10' />
      <Messages messages={messages} chatName={name} />
    </div>
  );
}
export default ReviewSession;
