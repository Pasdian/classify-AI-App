import { gql } from '@apollo/client';

export const CREATE_CHAT = gql`
  mutation CreateChat($clerk_user_id: String!, $name: String!, $created_at: DateTime!) {
    insertChat(clerk_user_id: $clerk_user_id, name: $name, created_at: $created_at) {
      id
      name
      created_at
    }
  }
`;

export const REMOVE_CHARACTERISTIC = gql`
  mutation RemoveCharacteristic($characteristicId: Int!) {
    deleteChatbot_characteristics(id: $characteristicId) {
      id
    }
  }
`;

export const DELETE_CHAT = gql`
  mutation DeleteChat($id: Int!) {
    deleteChat(id: $id) {
      id
    }
  }
`;

export const ADD_CHARACTERISTIC = gql`
  mutation AddCharacteristic($chatId: Int!, $content: String!, $created_at: DateTime!) {
    insertChatbot_characteristics(chat_id: $chatId, content: $content, created_at: $created_at) {
      id
      content
      created_at
    }
  }
`;

export const UPDATE_CHAT = gql`
  mutation UpdateChat($id: Int!, $name: String!) {
    updateChat(id: $id, name: $name) {
      id
      name
      created_at
    }
  }
`;

export const INSERT_MESSAGE = gql`
  mutation InsertMessage(
    $chat_session_id: Int!
    $content: String!
    $sender: String!
    $created_at: DateTime!
  ) {
    insertMessage(
      chat_session_id: $chat_session_id
      content: $content
      sender: $sender
      created_at: $created_at
    ) {
      id
      content
      created_at
      sender
    }
  }
`;

export const INSERT_GUEST = gql`
  mutation InsertGuest($name: String!, $email: String!, $created_at: DateTime!) {
    insertGuest(name: $name, email: $email, created_at: $created_at) {
      id
    }
  }
`;

export const INSERT_CHAT_SESSION = gql`
  mutation InsertSession($chat_id: Int!, $guest_id: Int!, $created_at: DateTime!) {
    insertChat_session(chat_id: $chat_id, guest_id: $guest_id, created_at: $created_at) {
      id
    }
  }
`;
