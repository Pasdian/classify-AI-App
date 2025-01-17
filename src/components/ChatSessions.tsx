'use client';
import { useEffect, useState } from 'react';
import { Chat } from '../../types/types';
import { Accordion, AccordionTrigger, AccordionItem, AccordionContent } from './ui/accordion';
import Avatar from './Avatar';
import Link from 'next/link';
import TimeAgo from 'react-timeago';

function ChatSessions({ chats }: { chats: Chat[] }) {
  const [sortedChats, setSortedChats] = useState<Chat[]>(chats);

  useEffect(() => {
    const sortedArray = [...chats].sort((a, b) => b.chat_session.length - a.chat_session.length);
    setSortedChats(sortedArray);
  }, [chats]);
  return (
    <div className='bg-white'>
      <Accordion type='single' collapsible>
        {sortedChats.map((chat) => {
          const hasSessions = chat.chat_session.length > 0;
          return (
            <AccordionItem key={chat.id} value={`item-${chat.id}`} className='px-10 py-5'>
              {hasSessions ? (
                <>
                  <AccordionTrigger>
                    <div className='flex text-left items-center w-full'>
                      <Avatar seed={chat.name} />
                      <div className='flex flex-1 justify-between space-x-4'>
                        <p>{chat.name}</p>
                        <p className='pr-4 font-bold text-right'>
                          {chat.chat_session.length} session{chat.chat_session.length !== 1 && 's'}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className='space-y-5 p-5 bg-gray-100 rounded-md'>
                    {chat.chat_session.map((session) => (
                      <Link
                        href={`/review-sessions/${session.id}`}
                        key={session.id}
                        className='relative p-10 text-white rounded-md block bg-blue-400'
                      >
                        <p className='text-lg font-bold'>{session.guests?.name || 'Anonymous'}</p>
                        <p className='text-sm font-light'>
                          {session.guests?.email || 'No email provided'}
                        </p>
                        <p className='absolute top-5 right-5 text-sm'>
                          <TimeAgo date={new Date(session.created_at)} />
                        </p>
                      </Link>
                    ))}
                  </AccordionContent>
                </>
              ) : (
                <p className='font-light'>{chat.name} (No Sessions)</p>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
export default ChatSessions;
