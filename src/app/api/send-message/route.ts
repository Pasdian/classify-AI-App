import { serverClient } from '@/lib/server/serverClient';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { GetChatByIdResponse, MessagesByChatSessionIdResponse } from '../../../../types/types';
import { GET_CHAT_BY_ID, GET_MESSAGES_BY_CHAT_SESSION_ID } from '../../../../graphql/queries';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { assistantPrompt } from '@/lib/prompt';
import { INSERT_MESSAGE } from '../../../../graphql/mutations';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export async function POST(req: NextRequest) {
  console.log('REQUEST>>>', req);
  const { chat_session_id, chat_id, content, name } = await req.json();

  console.log(
    `Recieved message from chat session ${chat_session_id}: ${content} (chat: ${chat_id})`
  );
  try {
    // Step 1: Fetch characteristics
    const { data } = await serverClient.query<GetChatByIdResponse>({
      query: GET_CHAT_BY_ID,
      variables: { id: chat_id },
    });
    const chat = data.chat;
    if (!chat) {
      return NextResponse.json({ error: 'chat not found' }, { status: 404 });
    }

    // Step 2 Fetch previous messages
    const { data: messagesData } = await serverClient.query<MessagesByChatSessionIdResponse>({
      query: GET_MESSAGES_BY_CHAT_SESSION_ID,
      variables: { chat_session_id },
      fetchPolicy: 'no-cache',
    });
    const previousMessages = messagesData.chat_session.message;

    const formattedPreviousMessages: ChatCompletionMessageParam[] = previousMessages.map(
      (message) => ({
        role: message.sender === 'ai' ? 'system' : 'user',
        name: message.sender === 'ai' ? 'system' : name,
        content: message.content,
      })
    );

    // Combine characteristics into a system prompt
    const systemPrompt = chat.chatbot_characteristics.map((c) => c.content).join(' + ');
    console.log(systemPrompt);

    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        name: 'system',
        content: `Eres un asistente útil hablando con ${name}. 
        ${assistantPrompt}
        Además de esto aqui hay información importante que ${name} añadio para su conversación personalizada:
        ${systemPrompt}`,
      },
      ...formattedPreviousMessages,
      {
        role: 'user',
        name: name,
        content: content,
      },
    ];

    // Step 3: Send the message to the completions API
    const openaiResponse = await openai.chat.completions.create({
      messages: messages,
      model: 'gpt-4o',
    });

    const aiResponse = openaiResponse?.choices?.[0]?.message?.content?.trim();

    if (!aiResponse) {
      return NextResponse.json({ error: 'Failed to generate AI response' }, { status: 500 });
    }

    // Step 4 Save the user's message in the database
    await serverClient.mutate({
      mutation: INSERT_MESSAGE,
      variables: { chat_session_id, content, sender: 'user', created_at: new Date() },
    });
    // Step 5 Save the AI message
    const aiMessageResult = await serverClient.mutate({
      mutation: INSERT_MESSAGE,
      variables: { chat_session_id, content: aiResponse, sender: 'ai', created_at: new Date() },
    });

    // Step 6: REturn the AI's response to the client
    return NextResponse.json({
      id: aiMessageResult.data.insertMessage.id,
      content: aiResponse,
    });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
