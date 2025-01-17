import { serverClient } from '@/lib/server/serverClient';
import { auth } from '@clerk/nextjs/server';
import { Chat, GetUserChatsResponse, GetUserChatsVariables } from '../../../../types/types';
import { GET_USER_CHATS } from '../../../../graphql/queries';
import ChatSessions from '@/components/ChatSessions';

async function ReviewSessions() {
  const { userId } = await auth();
  if (!userId) return;

  const {
    data: { chatsByUser },
  } = await serverClient.query<GetUserChatsResponse, GetUserChatsVariables>({
    query: GET_USER_CHATS,
    variables: {
      userId,
    },
  });

  const sortedChatsByUser: Chat[] = chatsByUser.map((chat) => ({
    ...chat,
    chat_session: [...chat.chat_session].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ),
  }));
  return (
    <div className='flex-1 px-10'>
      <h1 className='text-xl lg:text-3xl font-semibold mt-10'>Chat Sessions</h1>
      <h2 className='mb-5'>
        Review all the chat sessions the chat bots have had with your customers.
      </h2>

      <ChatSessions chats={sortedChatsByUser} />
    </div>
  );
}
export default ReviewSessions;
