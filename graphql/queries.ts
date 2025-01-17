import { gql } from '@apollo/client';

export const GET_CHAT_BY_ID = gql`
  query GetChatById($id: Int!) {
    chat(id: $id) {
      id
      name
      created_at
      chatbot_characteristics {
        id
        content
        created_at
      }
      chat_session {
        id
        created_at
        guest_id
        message {
          id
          content
          created_at
        }
      }
    }
  }
`;

export const GET_CHATS_BY_USER = gql`
  query GetChatsByUser($clerk_user_id: String!) {
    chatsByUser(clerk_user_id: $clerk_user_id) {
      id
      name
      created_at
      chatbot_characteristics {
        id
        content
        created_at
      }
      chat_session {
        id
        created_at
        guest_id
        message {
          id
          content
          created_at
        }
      }
    }
  }
`;

export const GET_USER_CHATS = gql`
  query GetUserChats($userId: String!) {
    chatsByUser(clerk_user_id: $userId) {
      id
      name
      chat_session {
        id
        created_at
        guest {
          name
          email
        }
      }
    }
  }
`;

export const GET_CHAT_SESSION_MESSAGES = gql`
  query GetChatSessionMessages($id: Int!) {
    chat_session(id: $id) {
      id
      created_at
      message {
        id
        content
        created_at
        sender
      }
      chat {
        name
      }
      guest {
        name
        email
      }
    }
  }
`;

export const GET_MESSAGES_BY_CHAT_SESSION_ID = gql`
  query GetMessagesByChatSessionId($chat_session_id: Int!) {
    chat_session(id: $chat_session_id) {
      id
      message {
        id
        content
        sender
        created_at
      }
    }
  }
`;
