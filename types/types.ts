export interface Chat {
  id: number;
  clerk_user_id: string;
  name: string;
  created_at: string;
  chatbot_characteristics: ChatbotCharacteristic[];
  chat_session: ChatSession[];
}

export interface ChatbotCharacteristic {
  id: number;
  chat_id: number;
  content: string;
  created_at: string;
}

export interface Guest {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface ChatSession {
  id: number;
  chat_id: number;
  guest_id: number;
  created_at: string;
  message: Message[];
  guests: Guest;
}

export interface Message {
  id: number;
  chat_session_id: number;
  content: string;
  created_at: string;
  sender: 'ai' | 'user';
}

export interface GetChatByIdResponse {
  chat: Chat;
}

export interface GetChatByIdVariables {
  id: string;
}

export interface GetChatsByUserData {
  chatsByUser: Chat[];
}

export interface GetChatsByUserDataVariables {
  clerk_user_id: string;
}

export interface GetUserChatsResponse {
  chatsByUser: Chat[];
}

export interface GetUserChatsVariables {
  userId: string;
}

export interface GetChatSessionMessagesResponse {
  chat_session: {
    id: number;
    created_at: string;
    message: Message[];
    chat: {
      name: string;
    };
    guest: {
      name: string;
      email: string;
    };
  };
}

export interface GetChatSessionMessagesVariables {
  id: number;
}

export interface MessagesByChatSessionIdResponse {
  chat_session: ChatSession;
}

export interface MessagesByChatSessionIdResponseVariables {
  chat_session_id: number;
}
