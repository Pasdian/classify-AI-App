import client from '../../graphql/apolloClient';
import { INSERT_MESSAGE, INSERT_GUEST, INSERT_CHAT_SESSION } from '../../graphql/mutations';

async function startNewChat(guestName: string, guestEmail: string, chatId: number) {
  try {
    // 1. Create new Guest
    const guestResult = await client.mutate({
      mutation: INSERT_GUEST,
      variables: { name: guestName, email: guestEmail, created_at: new Date() },
    });
    const guestId = guestResult.data.insertGuest.id;
    // 2. Initialize a new chat session
    const chatSessionResult = await client.mutate({
      mutation: INSERT_CHAT_SESSION,
      variables: { chat_id: chatId, guest_id: guestId, created_at: new Date() },
    });
    const chatSessionId = chatSessionResult.data.insertChat_session.id;
    // 3. Insert Initial Message (optional)
    await client.mutate({
      mutation: INSERT_MESSAGE,
      variables: {
        chat_session_id: chatSessionId,
        sender: 'ai',
        content: `Welcome ${guestName}!\n How can i assist you today?`,
        created_at: new Date(),
      },
    });
    console.log('New chat succesfully created');
    return chatSessionId;
  } catch (error) {
    console.log('Error starting new chat session:', error);
  }
}

export default startNewChat;
