import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, username, email, password, role } = body;

    if (!name || !username || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    if (typeof password !== 'string' || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    const existingEmail = await db.user.findUnique({ where: { email } });
    if (existingEmail) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    const existingUsername = await db.user.findUnique({ where: { username } });
    if (existingUsername) {
      return NextResponse.json({ error: 'This username is already taken' }, { status: 409 });
    }

    const normalizedRole = ['student', 'business', 'admin'].includes(role) ? role : 'student';
    const hashedPassword = await hash(password, 12);

    const user = await db.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        role: normalizedRole,
      },
    });

    if (normalizedRole === 'student') {
      await db.studentProfile.create({ data: { userId: user.id } });
    }

    if (normalizedRole === 'business') {
      await db.businessProfile.create({
        data: { userId: user.id, companyName: name, industry: '', description: '' },
      });
    }

    return NextResponse.json(
      { user: { id: user.id, name: user.name, email: user.email, username: user.username, role: user.role } },
      { status: 201 }
    );
  } catch (error) {
    console.error('[api/register] error:', error);
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 });
  }
}
