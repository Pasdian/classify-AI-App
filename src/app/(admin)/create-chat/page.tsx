'use client';
import Avatar from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMutation } from '@apollo/client';
import { CREATE_CHAT } from '../../../../graphql/mutations';
import { useUser } from '@clerk/nextjs';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

function CreateChat() {
  const { user } = useUser();
  const [name, setName] = useState('');
  const router = useRouter();

  const [createChat, { loading }] = useMutation(CREATE_CHAT, {
    variables: {
      clerk_user_id: user?.id,
      name,
      created_at: new Date(),
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await createChat();
      setName('');
      router.push(`/edit-chat/${data.data.insertChat.id}`);
    } catch (error) {
      console.error(error);
    }
  };
  if (!user) return null;

  return (
    <div className='flex flex-col items-center justify-center md:flex-row md:space-x-10 bg-white p-10 rounded-md m-10'>
      <Avatar seed='create-chat'></Avatar>
      <div>
        <h1 className='text-xl lg:text-3xl font-semibold'>Create</h1>
        <h2 className='font-light'> Create a new chat to assist you in your classifications.</h2>
        <form onSubmit={handleSubmit} className='flex flex-col md:flex-row gap-2 mt-5'>
          <Input
            placeholder='Chat Name...'
            className='max-w-lg'
            type='text'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type='submit' disabled={loading || !name}>
            {loading ? 'Creating Chat...' : 'Create Chat'}
          </Button>
        </form>
        <p className='text-gray-300 mt-5'>Example: Ternium Chat</p>
      </div>
    </div>
  );
}
export default CreateChat;
