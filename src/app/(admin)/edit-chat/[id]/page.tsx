'use client';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { BASE_URL } from '../../../../../graphql/apolloClient';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useMutation, useQuery } from '@apollo/client';
import { GetChatByIdResponse, GetChatByIdVariables } from '../../../../../types/types';
import { GET_CHAT_BY_ID } from '../../../../../graphql/queries';
import Avatar from '@/components/Avatar';
import Characteristic from '@/components/Characteristic';
import { DELETE_CHAT, ADD_CHARACTERISTIC, UPDATE_CHAT } from '../../../../../graphql/mutations';
import { redirect } from 'next/navigation';

function EditChat({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [url, setUrl] = useState<string>('');
  const [chatName, setChatName] = useState<string>('');
  const [newCharacteristic, setNewCharacteristic] = useState<string>('');

  const [addCharacteristic] = useMutation(ADD_CHARACTERISTIC, {
    refetchQueries: ['GetChatById'],
  });

  const [updateChat] = useMutation(UPDATE_CHAT, {
    refetchQueries: ['GetChatById'],
  });

  const [deleteChat] = useMutation(DELETE_CHAT, {
    refetchQueries: ['GetChatById'],
    awaitRefetchQueries: true,
  });

  const { data, loading, error } = useQuery<GetChatByIdResponse, GetChatByIdVariables>(
    GET_CHAT_BY_ID,
    { variables: { id } }
  );

  useEffect(() => {
    if (data) {
      setChatName(data.chat.name);
    }
  }, [data]);

  useEffect(() => {
    const url = `${BASE_URL}/chat/${id}`;

    setUrl(url);
  }, [id]);

  const handleAddCharacteristic = async (content: string) => {
    try {
      const promise = addCharacteristic({
        variables: {
          chatId: Number(id),
          content,
          created_at: new Date(),
        },
      });
      toast.promise(promise, {
        loading: 'Adding...',
        success: 'Information added.',
        error: 'Failed to add Information.',
      });
    } catch (error) {
      console.error('Failed to add characteristic: ', error);
    }
  };

  const handleUpdateChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const promise = updateChat({
        variables: {
          id,
          name: chatName,
        },
      });
      toast.promise(promise, {
        loading: 'Updating...',
        success: 'Chat successfully updated.',
        error: 'Failed to update chat.',
      });
    } catch (error) {
      console.error('Failed to update chat: ', error);
    }
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this chat?');
    if (!isConfirmed) return;
    try {
      const promise = deleteChat({ variables: { id } });
      toast.promise(promise, {
        loading: 'Deleting...',
        success: 'Chat successfully deleted.',
        error: 'Failed to delete chat.',
      });
    } catch (error) {
      console.log('Error deleting chat: ', error);
      toast.error('Failed to delete chat.');
    }
  };

  if (loading)
    return (
      <div className='mx-auto animate-spin p-10'>
        <Avatar seed='Classify AI App'></Avatar>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  if (!data?.chat) return redirect('/view-chats');

  return (
    <div className='px-0 md:p-10'>
      <div className='md:sticky md:top-0 z-50 sm:max-w-sm ml-auto space-y-2 md:border p-5 rounded-b-lg md:rounded-lg bg-blue-400'>
        <h2 className='text-white text-sm font-bold'>Link to Chat</h2>
        <p className='text-sm italic text-white'>
          Share this link with your customers to start conversations with your chatbot.
        </p>
        <div className='flex items-center space-x-2'>
          <Link href={url} className='w-full cursos-pointer hover:opacity-50'>
            <Input value={url} readOnly className='cursos-pointer' />
          </Link>
          <Button
            type='submit'
            size='sm'
            className='px-3'
            onClick={() => {
              navigator.clipboard.writeText(url);
              toast.success('Link copied to clipboard');
            }}
          >
            <span className='sr-only'>Copy Link</span>
            <Copy className='h-4 w-4' />
          </Button>
        </div>
      </div>
      <section className='relative mt-5 bg-white p-5 md:p-10 rounded-lg'>
        <Button
          variant='destructive'
          className='absolute top-2 right-2 h-8 w-2'
          onClick={() => handleDelete(id)}
        >
          X
        </Button>
        <div className='flex space-x-4'>
          <Avatar seed={chatName}></Avatar>
          <form onSubmit={handleUpdateChat} className='flex space-x-2 items-center'>
            <Input
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              placeholder='Chat Name...'
              required
              className='w-full border-none bg-transparent text-xl font-bold'
            />
            <Button type='submit' disabled={!chatName}>
              Update
            </Button>
          </form>
        </div>
        <h2 className='text-xl font-bold mt-10'> Here&apos;s what your AI knows...</h2>
        <p>
          Your Chat instance is equipped with the following information to assist you in your
          conversations.
        </p>
        <div className='bg-gray-200 p-5 rounded-md mt-5'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCharacteristic(newCharacteristic);
              setNewCharacteristic('');
            }}
            className='flex space-x-2 mb-5'
          >
            <Input
              type='text'
              placeholder='Example: Limit the scope of the answers to textiles and shoes.'
              value={newCharacteristic}
              onChange={(e) => setNewCharacteristic(e.target.value)}
            ></Input>
            <Button type='submit' disabled={!newCharacteristic}>
              Add
            </Button>
          </form>
          <ul className='flex flex-wrap-reverse gap-5'>
            {data?.chat?.chatbot_characteristics?.map((characteristic) => (
              <Characteristic key={characteristic.id} characteristic={characteristic} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
export default EditChat;
