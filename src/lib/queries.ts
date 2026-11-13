'use server';

import { db } from '@/lib/prisma';
import { auth } from '@/auth';
import { User, StudentProfile, BusinessProfile, Course, CourseLesson, CourseEnrollment, Challenge, ChallengeSubmission, Project, MicroInternship, Application, SkillSwap, SkillCreditTransaction, Review, Conversation, Message, Notification, Certificate, ExperiencePointTransaction, Payment } from '@/types';

export async function getCurrentUser(): Promise<User | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    role: user.role as User['role'],
    avatar: user.avatar || undefined,
    bio: user.bio || undefined,
    location: user.location || undefined,
    headline: user.headline || undefined,
    createdAt: user.createdAt.toISOString(),
  };
}

export async function getUser(id: string): Promise<User | null> {
  const user = await db.user.findUnique({ where: { id } });
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    role: user.role as User['role'],
    avatar: user.avatar || undefined,
    bio: user.bio || undefined,
    location: user.location || undefined,
    headline: user.headline || undefined,
    createdAt: user.createdAt.toISOString(),
  };
}

export async function getUserByUsername(username: string): Promise<User | null> {
  const user = await db.user.findUnique({ where: { username } });
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    role: user.role as User['role'],
    avatar: user.avatar || undefined,
    bio: user.bio || undefined,
    location: user.location || undefined,
    headline: user.headline || undefined,
    createdAt: user.createdAt.toISOString(),
  };
}

export async function getStudentProfile(userId: string): Promise<StudentProfile | null> {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) return null;
  const userSkills = await db.userSkill.findMany({ where: { userId }, include: { skill: true } });
  const skills = userSkills.filter((us) => us.type === 'known').map((us) => us.skill.name);
  const learningGoals = userSkills.filter((us) => us.type === 'learning').map((us) => us.skill.name);
  const interests = (await db.userInterest.findMany({ where: { userId }, select: { interest: true } })).map((ui) => ui.interest);
  const profile = await db.studentProfile.findUnique({ where: { userId } });
  if (!profile) {
    return {
      userId,
      skills,
      learningGoals,
      interests,
      experienceLevel: 'beginner',
      availability: '10-15 hours/week',
      careerGoal: '',
      skillCredits: 0,
      experiencePoints: 0,
      profileCompletion: 0,
      rating: 0,
      reviewCount: 0,
    };
  }
  return {
    userId,
    skills,
    learningGoals,
    interests,
    experienceLevel: profile.experienceLevel as StudentProfile['experienceLevel'],
    availability: profile.availability,
    careerGoal: profile.careerGoal,
    skillCredits: profile.skillCredits,
    experiencePoints: profile.experiencePoints,
    profileCompletion: profile.profileCompletion,
    rating: profile.rating,
    reviewCount: profile.reviewCount,
  };
}

export async function getAllUsers(): Promise<User[]> {
  const users = await db.user.findMany({ orderBy: { createdAt: 'desc' } });
  return users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    username: u.username,
    role: u.role as User['role'],
    avatar: u.avatar || undefined,
    bio: u.bio || undefined,
    location: u.location || undefined,
    headline: u.headline || undefined,
    createdAt: u.createdAt.toISOString(),
  }));
}

export async function getStudentProfiles(): Promise<StudentProfile[]> {
  const profiles = await db.studentProfile.findMany({ include: { user: true } });
  return profiles.map((p) => ({
    userId: p.userId,
    skills: [],
    learningGoals: [],
    interests: [],
    experienceLevel: p.experienceLevel as StudentProfile['experienceLevel'],
    availability: p.availability,
    careerGoal: p.careerGoal,
    skillCredits: p.skillCredits,
    experiencePoints: p.experiencePoints,
    profileCompletion: p.profileCompletion,
    rating: p.rating,
    reviewCount: p.reviewCount,
  }));
}

export async function getBusinessProfile(userId: string): Promise<BusinessProfile | null> {
  const profile = await db.businessProfile.findUnique({ where: { userId } });
  if (!profile) return null;
  return {
    userId,
    companyName: profile.companyName,
    industry: profile.industry,
    website: profile.website || undefined,
    description: profile.description,
  };
}

export async function getUserSkills(userId: string): Promise<{ name: string; type: string }[]> {
  const userSkills = await db.userSkill.findMany({ where: { userId }, include: { skill: true } });
  return userSkills.map((us) => ({ name: us.skill.name, type: us.type }));
}

export async function getCourses(filters?: { category?: string; difficulty?: string; search?: string }): Promise<Course[]> {
  const where: Record<string, unknown> = { status: 'published' };
  if (filters?.category && filters.category !== 'all') where.category = filters.category;
  if (filters?.difficulty && filters.difficulty !== 'all') where.difficulty = filters.difficulty;
  const courses = await db.course.findMany({
    where,
    include: { instructor: true, skills: true, lessons: true },
    orderBy: { createdAt: 'desc' },
  });
  return courses.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    instructorId: c.instructorId,
    instructorName: c.instructor?.name || '',
    category: c.category,
    skills: c.skills.map((cs) => cs.skillName),
    difficulty: c.difficulty as Course['difficulty'],
    duration: c.duration,
    price: c.price,
    rating: c.rating,
    reviewCount: c.reviewCount,
    enrollmentCount: c.enrollmentCount,
    thumbnail: c.thumbnail || undefined,
    status: c.status as Course['status'],
    lessons: c.lessons.map((l) => ({
      id: l.id,
      courseId: l.courseId,
      title: l.title,
      description: l.description,
      duration: l.duration,
      content: l.content,
      order: l.order,
    })),
    createdAt: c.createdAt.toISOString(),
  }));
}

export async function getCourseById(id: string): Promise<Course | null> {
  const course = await db.course.findUnique({
    where: { id },
    include: { instructor: true, skills: true, lessons: { orderBy: { order: 'asc' } }, enrollments: true, reviews: true },
  });
  if (!course) return null;
  const reviews = course.reviews.map((r) => ({
    id: r.id,
    courseId: r.courseId,
    userId: r.userId,
    rating: r.rating,
    comment: r.comment,
    createdAt: r.createdAt.toISOString(),
  }));
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    instructorId: course.instructorId,
    instructorName: course.instructor?.name || '',
    category: course.category,
    skills: course.skills.map((cs) => cs.skillName),
    difficulty: course.difficulty as Course['difficulty'],
    duration: course.duration,
    price: course.price,
    rating: course.rating,
    reviewCount: course.reviewCount,
    enrollmentCount: course.enrollmentCount,
    thumbnail: course.thumbnail || undefined,
    status: course.status as Course['status'],
    lessons: course.lessons.map((l) => ({
      id: l.id,
      courseId: l.courseId,
      title: l.title,
      description: l.description,
      duration: l.duration,
      content: l.content,
      order: l.order,
    })),
    createdAt: course.createdAt.toISOString(),
  };
}

export async function getCoursesByInstructor(instructorId: string): Promise<Course[]> {
  const courses = await db.course.findMany({ where: { instructorId }, include: { instructor: true, skills: true } });
  return courses.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    instructorId: c.instructorId,
    instructorName: c.instructor?.name || '',
    category: c.category,
    skills: c.skills.map((cs) => cs.skillName),
    difficulty: c.difficulty as Course['difficulty'],
    duration: c.duration,
    price: c.price,
    rating: c.rating,
    reviewCount: c.reviewCount,
    enrollmentCount: c.enrollmentCount,
    thumbnail: c.thumbnail || undefined,
    status: c.status as Course['status'],
    lessons: [],
    createdAt: c.createdAt.toISOString(),
  }));
}

export async function getEnrollmentsByUser(userId: string): Promise<CourseEnrollment[]> {
  const enrollments = await db.courseEnrollment.findMany({ where: { userId }, include: { course: { include: { instructor: true } } } });
  return enrollments.map((e) => ({
    id: e.id,
    userId: e.userId,
    courseId: e.courseId,
    progress: e.progress,
    completedLessons: JSON.parse(e.completedLessons || '[]') as string[],
    enrolledAt: e.enrolledAt.toISOString(),
  }));
}

export async function getChallenges(): Promise<Challenge[]> {
  const challenges = await db.challenge.findMany({ include: { skills: true, requirements: true } });
  return challenges.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    difficulty: c.difficulty as Challenge['difficulty'],
    estimatedTime: c.estimatedTime,
    skills: c.skills.map((cs) => cs.skillName),
    requirements: c.requirements.map((cr) => cr.text),
    evaluationCriteria: [],
    submissionType: c.submissionType,
    status: c.status as Challenge['status'],
  }));
}

export async function getProjectsByUser(userId?: string): Promise<Project[]> {
  const projects = await db.project.findMany({ where: userId ? { userId } : undefined, include: { user: true, skills: true }, orderBy: { createdAt: 'desc' } });
  return projects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    skillsUsed: p.skills.map((ps) => ps.skillName),
    repositoryUrl: p.repositoryUrl || undefined,
    demoUrl: p.demoUrl || undefined,
    images: JSON.parse(p.images || '[]') as string[],
    role: p.role,
    duration: p.duration,
    outcome: p.outcome,
    userId: p.userId,
    createdAt: p.createdAt.toISOString(),
  }));
}

export async function getProjects(userId?: string): Promise<Project[]> {
  return getProjectsByUser(userId);
}

export async function getMicroInternships(): Promise<MicroInternship[]> {
  const internships = await db.microInternship.findMany({ include: { applications: true } });
  const businessIds = [...new Set(internships.map((i) => i.businessId).filter(Boolean))] as string[];
  const businesses = await db.user.findMany({ where: { id: { in: businessIds } } });
  const businessNameMap = Object.fromEntries(businesses.map((b) => [b.id, b.name]));
  return internships.map((mi) => ({
    id: mi.id,
    title: mi.title,
    description: mi.description,
    businessId: mi.businessId,
    businessName: mi.businessId ? (businessNameMap[mi.businessId] || '') : '',
    skills: JSON.parse(mi.skills || '[]') as string[],
    difficulty: mi.difficulty as MicroInternship['difficulty'],
    duration: mi.duration,
    budget: mi.budget,
    deadline: mi.deadline,
    deliverables: JSON.parse(mi.deliverables || '[]') as string[],
    niceToHaveSkills: JSON.parse(mi.niceToHaveSkills || '[]') as string[],
    status: mi.status as MicroInternship['status'],
    createdAt: mi.createdAt.toISOString(),
  }));
}

export async function getApplicationsByStudent(studentId: string): Promise<Application[]> {
  const applications = await db.application.findMany({ where: { studentId }, include: { microInternship: true } });
  return applications.map((a) => ({
    id: a.id,
    microInternshipId: a.microInternshipId,
    studentId: a.studentId,
    proposal: a.proposal,
    status: a.status as Application['status'],
    createdAt: a.createdAt.toISOString(),
  }));
}

export async function getApplications(): Promise<Application[]> {
  const applications = await db.application.findMany({ include: { microInternship: true } });
  return applications.map((a) => ({
    id: a.id,
    microInternshipId: a.microInternshipId,
    studentId: a.studentId,
    proposal: a.proposal,
    status: a.status as Application['status'],
    createdAt: a.createdAt.toISOString(),
  }));
}

export async function getApplicationsByInternship(microInternshipId: string): Promise<Application[]> {
  const applications = await db.application.findMany({ where: { microInternshipId }, include: { student: true } });
  return applications.map((a) => ({
    id: a.id,
    microInternshipId: a.microInternshipId,
    studentId: a.studentId,
    proposal: a.proposal,
    status: a.status as Application['status'],
    createdAt: a.createdAt.toISOString(),
  }));
}

export async function getAllSkillSwaps(): Promise<SkillSwap[]> {
  const swaps = await db.skillSwap.findMany();
  return swaps.map((s) => ({
    id: s.id,
    student1Id: s.student1Id,
    student2Id: s.student2Id,
    skill1: s.skill1,
    skill2: s.skill2,
    status: s.status as SkillSwap['status'],
    hoursLogged: s.hoursLogged,
    createdAt: s.createdAt.toISOString(),
  }));
}

export async function getSkillSwapsByUser(userId: string): Promise<SkillSwap[]> {
  const swaps = await db.skillSwap.findMany({
    where: { OR: [{ student1Id: userId }, { student2Id: userId }] },
    include: { student1: true, student2: true },
  });
  return swaps.map((s) => ({
    id: s.id,
    student1Id: s.student1Id,
    student2Id: s.student2Id,
    skill1: s.skill1,
    skill2: s.skill2,
    status: s.status as SkillSwap['status'],
    hoursLogged: s.hoursLogged,
    createdAt: s.createdAt.toISOString(),
  }));
}

export async function getCreditTransactionsByUser(userId: string): Promise<SkillCreditTransaction[]> {
  const transactions = await db.skillCreditTransaction.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  return transactions.map((t) => ({
    id: t.id,
    userId: t.userId,
    amount: t.amount,
    type: t.type as SkillCreditTransaction['type'],
    description: t.description,
    createdAt: t.createdAt.toISOString(),
  }));
}

export async function getXPByUser(userId: string): Promise<ExperiencePointTransaction[]> {
  const transactions = await db.experiencePointTransaction.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  return transactions.map((t) => ({
    id: t.id,
    userId: t.userId,
    amount: t.amount,
    description: t.description,
    createdAt: t.createdAt.toISOString(),
  }));
}

export async function getReviewsByUser(userId: string): Promise<Review[]> {
  const reviews = await db.review.findMany({ where: { revieweeId: userId }, include: { reviewer: true }, orderBy: { createdAt: 'desc' } });
  return reviews.map((r) => ({
    id: r.id,
    reviewerId: r.reviewerId,
    revieweeId: r.revieweeId,
    rating: r.rating,
    comment: r.comment,
    context: r.context,
    createdAt: r.createdAt.toISOString(),
  }));
}

export async function getReviews(context?: string): Promise<Review[]> {
  const reviews = await db.review.findMany({ include: { reviewer: true }, orderBy: { createdAt: 'desc' } });
  return reviews
    .filter((r) => !context || r.context === context)
    .map((r) => ({
      id: r.id,
      reviewerId: r.reviewerId,
      revieweeId: r.revieweeId,
      rating: r.rating,
      comment: r.comment,
      context: r.context,
      createdAt: r.createdAt.toISOString(),
    }));
}

export async function getConversationsByUser(userId: string): Promise<Conversation[]> {
  const participations = await db.conversationParticipant.findMany({
    where: { userId },
    include: { conversation: { include: { participants: { include: { user: true } } } } },
  });
  const conversations = await Promise.all(
    participations.map((p) => p.conversation)
  );
  return conversations.map((c) => ({
    id: c.id,
    participants: c.participants.map((p) => p.user.id),
    lastMessage: c.lastMessage || undefined,
    lastMessageAt: c.lastMessageAt ? c.lastMessageAt.toISOString() : undefined,
  }));
}

export async function getMessagesByConversation(conversationId: string): Promise<Message[]> {
  const messages = await db.message.findMany({ where: { conversationId }, include: { sender: true }, orderBy: { createdAt: 'asc' } });
  return messages.map((m) => ({
    id: m.id,
    conversationId: m.conversationId,
    senderId: m.senderId,
    content: m.content,
    read: m.read,
    createdAt: m.createdAt.toISOString(),
  }));
}

export async function getNotificationsByUser(userId: string): Promise<Notification[]> {
  const notifications = await db.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  return notifications.map((n) => ({
    id: n.id,
    userId: n.userId,
    type: n.type,
    title: n.title,
    message: n.message,
    read: n.read,
    link: n.link || undefined,
    createdAt: n.createdAt.toISOString(),
  }));
}

export async function getPaymentsByUser(userId: string): Promise<Payment[]> {
  const payments = await db.payment.findMany({ where: { OR: [{ fromUserId: userId }, { toUserId: userId }] }, include: { fromUser: true, toUser: true }, orderBy: { createdAt: 'desc' } });
  return payments.map((p) => ({
    id: p.id,
    fromUserId: p.fromUserId,
    toUserId: p.toUserId,
    amount: p.amount,
    platformFee: p.platformFee,
    status: p.status as Payment['status'],
    context: p.context,
    createdAt: p.createdAt.toISOString(),
  }));
}

export async function getAllPayments(): Promise<Payment[]> {
  const payments = await db.payment.findMany({ include: { fromUser: true, toUser: true }, orderBy: { createdAt: 'desc' } });
  return payments.map((p) => ({
    id: p.id,
    fromUserId: p.fromUserId,
    toUserId: p.toUserId,
    amount: p.amount,
    platformFee: p.platformFee,
    status: p.status as Payment['status'],
    context: p.context,
    createdAt: p.createdAt.toISOString(),
  }));
}

export async function getCertificatesByUser(userId: string): Promise<Certificate[]> {
  const certificates = await db.certificate.findMany({ where: { userId }, orderBy: { issuedAt: 'desc' } });
  return certificates.map((c) => ({
    id: c.id,
    userId: c.userId,
    type: c.type as Certificate['type'],
    title: c.title,
    issuedAt: c.issuedAt.toISOString(),
  }));
}

export async function getSubmissionsByUser(userId: string): Promise<ChallengeSubmission[]> {
  const submissions = await db.challengeSubmission.findMany({ where: { userId }, orderBy: { submittedAt: 'desc' } });
  return submissions.map((s) => ({
    id: s.id,
    challengeId: s.challengeId,
    userId: s.userId,
    submissionUrl: s.submissionUrl,
    description: s.description,
    status: s.status as ChallengeSubmission['status'],
    feedback: s.feedback || undefined,
    submittedAt: s.submittedAt.toISOString(),
  }));
}

export async function sendMessage(conversationId: string, content: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');
  const msg = await db.message.create({ data: { conversationId, senderId: session.user.id, content } });
  await db.conversation.update({ where: { id: conversationId }, data: { lastMessage: content, lastMessageAt: new Date() } });
  return msg;
}

export async function createApplication(microInternshipId: string, proposal: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');
  return db.application.create({ data: { microInternshipId, studentId: session.user.id, proposal } });
}

export async function createSkillSwap(student2Id: string, skill1: string, skill2: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');
  return db.skillSwap.create({ data: { student1Id: session.user.id, student2Id, skill1, skill2 } });
}

export async function createProject(data: { title: string; description: string; role: string; duration: string; outcome: string; repositoryUrl?: string; demoUrl?: string; skillsUsed: string[] }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');
  const project = await db.project.create({ data: { title: data.title, description: data.description, role: data.role, duration: data.duration, outcome: data.outcome, repositoryUrl: data.repositoryUrl, demoUrl: data.demoUrl, userId: session.user.id } });
  for (const skill of data.skillsUsed) {
    const skillRecord = await db.skill.upsert({ where: { name: skill }, create: { name: skill, category: 'General' }, update: { category: 'General' } });
    await db.projectSkill.create({ data: { projectId: project.id, skillName: skill } }).catch(() => {});
  }
  return project;
}

export async function markNotificationRead(id: string) {
  return db.notification.update({ where: { id }, data: { read: true } });
}

export async function updateStudentProfile(
  userId: string,
  data: {
    name?: string;
    bio?: string;
    location?: string;
    headline?: string;
    experienceLevel?: string;
    availability?: string;
    careerGoal?: string;
    skillCredits?: number;
    experiencePoints?: number;
    profileCompletion?: number;
    rating?: number;
    reviewCount?: number;
    skills?: string[];
  }
) {
  const user = await db.user.update({
    where: { id: userId },
    data: { name: data.name, bio: data.bio, location: data.location, headline: data.headline },
  });

  const profile = await db.studentProfile.upsert({
    where: { userId },
    create: {
      userId,
      experienceLevel: data.experienceLevel || 'beginner',
      availability: data.availability || '10-15 hours/week',
      careerGoal: data.careerGoal || '',
      skillCredits: data.skillCredits || 0,
      experiencePoints: data.experiencePoints || 0,
      profileCompletion: data.profileCompletion || 0,
      rating: data.rating || 0,
      reviewCount: data.reviewCount || 0,
    },
    update: {
      experienceLevel: data.experienceLevel || undefined,
      availability: data.availability || undefined,
      careerGoal: data.careerGoal || undefined,
      skillCredits: data.skillCredits ?? undefined,
      experiencePoints: data.experiencePoints ?? undefined,
      profileCompletion: data.profileCompletion ?? undefined,
      rating: data.rating ?? undefined,
      reviewCount: data.reviewCount ?? undefined,
    },
  });

  if (data.skills && data.skills.length > 0) {
    await db.userSkill.deleteMany({ where: { userId, type: 'known' } });
    for (const skillName of data.skills) {
      const skill = await db.skill.upsert({ where: { name: skillName }, create: { name: skillName, category: 'General' }, update: { category: 'General' } });
      await db.userSkill.create({ data: { userId, skillId: skill.id, type: 'known' } });
    }
  }

  return { user, profile };
}

export async function updateBusinessProfile(
  userId: string,
  data: { companyName?: string; industry?: string; website?: string; description?: string }
) {
  const profile = await db.businessProfile.upsert({
    where: { userId },
    create: { userId, companyName: data.companyName || '', industry: data.industry || '', website: data.website, description: data.description || '' },
    update: { companyName: data.companyName || '', industry: data.industry || '', website: data.website, description: data.description || '' },
  });
  const user = await db.user.update({
    where: { id: userId },
    data: { name: data.companyName || '', bio: data.description || '', location: data.industry || '' },
  });
  return { user, profile };
}

export async function updateApplicationStatus(id: string, status: string) {
  return db.application.update({ where: { id }, data: { status } });
}

export async function updateSkillSwapStatus(id: string, status: string) {
  return db.skillSwap.update({ where: { id }, data: { status } });
}
