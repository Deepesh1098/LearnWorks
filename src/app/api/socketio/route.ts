// Socket.io server runs as a separate process
// Run with: npm run socket
// Or use the built-in polling fallback (default)

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Socket.io server should run separately with: npm run socket',
    fallback: 'Messages will use polling when socket.io is not available',
  });
}
