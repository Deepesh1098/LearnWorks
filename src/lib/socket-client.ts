'use client';

import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    socket = io(typeof window !== 'undefined' ? window.location.origin : '', {
      path: '/api/socketio',
      addTrailingSlash: false,
    });
  }
  return socket;
}

export function useSocket(userId?: string) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;
    const s = getSocket();
    s.emit('register', userId);
    socketRef.current = s;
    return () => { s.disconnect(); };
  }, [userId]);

  const joinConversation = useCallback((conversationId: string) => {
    socketRef.current?.emit('join_conversation', conversationId);
  }, []);

  const sendMessage = useCallback((conversationId: string, senderId: string, content: string) => {
    socketRef.current?.emit('send_message', { conversationId, senderId, content });
  }, []);

  const onNewMessage = useCallback((callback: (data: unknown) => void) => {
    socketRef.current?.on('new_message', callback);
    return () => { socketRef.current?.off('new_message', callback); };
  }, []);

  const emitTyping = useCallback((conversationId: string, userId: string) => {
    socketRef.current?.emit('typing', { conversationId, userId });
  }, []);

  const emitStopTyping = useCallback((conversationId: string, userId: string) => {
    socketRef.current?.emit('stop_typing', { conversationId, userId });
  }, []);

  return { joinConversation, sendMessage, onNewMessage, emitTyping, emitStopTyping };
}
