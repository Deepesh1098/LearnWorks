export type UserRole = 'student' | 'business' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  location?: string;
  headline?: string;
  createdAt: string;
}

export interface StudentProfile {
  userId: string;
  skills: string[];
  learningGoals: string[];
  interests: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  availability: string;
  careerGoal: string;
  skillCredits: number;
  experiencePoints: number;
  profileCompletion: number;
  rating: number;
  reviewCount: number;
}

export interface BusinessProfile {
  userId: string;
  companyName: string;
  industry: string;
  website?: string;
  description: string;
  logo?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  instructorName: string;
  category: string;
  skills: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  price: number;
  rating: number;
  reviewCount: number;
  enrollmentCount: number;
  thumbnail?: string;
  status: 'draft' | 'review' | 'published';
  lessons: CourseLesson[];
  createdAt: string;
}

export interface CourseLesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: string;
  content: string;
  order: number;
}

export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  completedLessons: string[];
  enrolledAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  skills: string[];
  requirements: string[];
  evaluationCriteria: string[];
  submissionType: string;
  status: 'active' | 'completed' | 'upcoming';
}

export interface ChallengeSubmission {
  id: string;
  challengeId: string;
  userId: string;
  submissionUrl: string;
  description: string;
  status: 'submitted' | 'evaluated' | 'passed' | 'failed';
  feedback?: string;
  submittedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  skillsUsed: string[];
  repositoryUrl?: string;
  demoUrl?: string;
  images: string[];
  role: string;
  duration: string;
  outcome: string;
  userId: string;
  createdAt: string;
}

export interface MicroInternship {
  id: string;
  title: string;
  description: string;
  businessId: string;
  businessName: string;
  skills: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  budget: number;
  deadline: string;
  deliverables: string[];
  niceToHaveSkills: string[];
  status: 'open' | 'in_progress' | 'completed' | 'closed';
  createdAt: string;
}

export interface Application {
  id: string;
  microInternshipId: string;
  studentId: string;
  proposal: string;
  status: 'applied' | 'shortlisted' | 'accepted' | 'in_progress' | 'submitted' | 'completed' | 'rejected';
  createdAt: string;
}

export interface SkillSwap {
  id: string;
  student1Id: string;
  student2Id: string;
  skill1: string;
  skill2: string;
  status: 'pending' | 'accepted' | 'completed' | 'rejected';
  hoursLogged: number;
  createdAt: string;
}

export interface SkillCreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earned' | 'spent';
  description: string;
  createdAt: string;
}

export interface Review {
  id: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  context: string;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: string;
  lastMessageAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface PortfolioProject {
  id: string;
  userId: string;
  projectId: string;
  featured: boolean;
  order: number;
}

export interface Certificate {
  id: string;
  userId: string;
  type: 'course' | 'challenge' | 'micro_internship';
  title: string;
  issuedAt: string;
}

export interface ExperiencePointTransaction {
  id: string;
  userId: string;
  amount: number;
  description: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  platformFee: number;
  status: 'pending' | 'completed' | 'failed';
  context: string;
  createdAt: string;
}

export interface SkillGapAnalysis {
  careerGoal: string;
  currentSkills: string[];
  missingSkills: string[];
  roadmap: string[];
}

export interface MatchResult {
  userId: string;
  name: string;
  avatar?: string;
  headline?: string;
  skills: string[];
  experienceLevel: string;
  rating: number;
  score: number;
  reasons: string[];
}
