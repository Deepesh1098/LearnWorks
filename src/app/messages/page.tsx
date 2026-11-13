'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/layout/app-shell';
import { useAuth } from '@/lib/auth-context';
import { getConversationsByUser, getMessagesByConversation, sendMessage, getUser } from '@/lib/queries';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Avatar from '@/components/ui/avatar';
import Button from '@/components/ui/button';
import { Send, MessageSquare } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Conversation, Message, User } from '@/types';

export default function MessagesPage() {
  return (
    <AppShell>
      <MessagesContent />
    </AppShell>
  );
}

function MessagesContent() {
  const { user } = useAuth();
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedMessages, setSelectedMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});

  useEffect(() => {
    if (user?.id) getConversationsByUser(user.id).then(setConversations);
  }, [user?.id]);

  useEffect(() => {
    if (selectedConv) getMessagesByConversation(selectedConv).then(setSelectedMessages);
  }, [selectedConv]);

  useEffect(() => {
    const ids = [...new Set(conversations.flatMap(c => c.participants || []).filter(Boolean))] as string[];
    Promise.all(ids.map((id) => getUser(id))).then((found) => {
      const map: Record<string, User> = {};
      found.forEach((u) => { if (u) map[u.id] = u; });
      setUsers(map);
    });
  }, [conversations]);

  if (!user) return null;

  const selectedConversation = conversations.find(c => c.id === selectedConv);

  const handleSend = async () => {
    if (!message.trim() || !selectedConv) return;
    await sendMessage(selectedConv, message);
    const msgs = await getMessagesByConversation(selectedConv);
    setSelectedMessages(msgs);
    setMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Messages</h1>
      <div className="grid lg:grid-cols-3 gap-0 bg-white border border-slate-200 rounded-xl overflow-hidden" style={{ height: '600px' }}>
        {/* Conversation List */}
        <div className="border-r border-slate-200 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <MessageSquare className="h-10 w-10 text-slate-300 mb-2" />
              <p className="text-sm text-slate-500">No conversations yet</p>
            </div>
          ) : (
            conversations.map(conv => {
              const otherUserId = conv.participants.find(p => p !== user.id);
              const otherUser = users[otherUserId || ''] || null;
              const isSelected = selectedConv === conv.id;

              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConv(conv.id)}
                  className={`w-full flex items-center gap-3 p-4 border-b border-slate-100 text-left transition-colors ${
                    isSelected ? 'bg-indigo-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <Avatar name={otherUser?.name || 'Unknown'} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{otherUser?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>
                  </div>
                  <span className="text-[10px] text-slate-400">{conv.lastMessageAt ? formatDate(conv.lastMessageAt) : ''}</span>
                </button>
              );
            })
          )}
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2 flex flex-col">
          {!selectedConv ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <MessageSquare className="h-12 w-12 text-slate-300 mb-3" />
              <p className="text-slate-500">Select a conversation to start messaging</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-4 border-b border-slate-200 flex items-center gap-3">
                {(() => {
                  const otherUserId = selectedConversation?.participants.find(p => p !== user.id);
                  const otherUser = users[otherUserId || ''] || null;
                  return (
                    <>
                      <Avatar name={otherUser?.name || ''} size="sm" />
                      <span className="font-medium text-slate-900">{otherUser?.name}</span>
                    </>
                  );
                })()}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedMessages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl text-sm ${
                      msg.senderId === user.id
                        ? 'bg-indigo-600 text-white rounded-br-md'
                        : 'bg-slate-100 text-slate-900 rounded-bl-md'
                    }`}>
                      <p>{msg.content}</p>
                      <p className={`text-[10px] mt-1 ${msg.senderId === user.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {formatDate(msg.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-slate-200 flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-full text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                />
                <Button onClick={handleSend} disabled={!message.trim()} className="rounded-full px-4">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
