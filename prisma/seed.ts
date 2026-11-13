import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean existing data
  await prisma.message.deleteMany();
  await prisma.conversationParticipant.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.experiencePointTransaction.deleteMany();
  await prisma.skillCreditTransaction.deleteMany();
  await prisma.skillSwap.deleteMany();
  await prisma.application.deleteMany();
  await prisma.microInternship.deleteMany();
  await prisma.challengeSubmission.deleteMany();
  await prisma.challengeRequirement.deleteMany();
  await prisma.challengeSkill.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.projectSkill.deleteMany();
  await prisma.project.deleteMany();
  await prisma.courseEnrollment.deleteMany();
  await prisma.courseReview.deleteMany();
  await prisma.courseSkill.deleteMany();
  await prisma.courseLesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.userInterest.deleteMany();
  await prisma.learningGoal.deleteMany();
  await prisma.userSkill.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.businessProfile.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  const password = await hash('demo1234', 12);

  // Create Users
  const arjun = await prisma.user.create({ data: { name: 'Deepesh Yadav', email: 'deepesh@learnworks.demo', username: 'deepesh', role: 'student', bio: 'Passionate full-stack developer and lifelong learner. Currently mastering React and Python.', location: 'Bangalore', headline: 'Full-Stack Developer | React & Python', password } });
  const priya = await prisma.user.create({ data: { name: 'Priya Patel', email: 'priya@learnworks.demo', username: 'priya', role: 'student', bio: 'UI/UX designer with a love for creating intuitive digital experiences.', location: 'Mumbai', headline: 'UI/UX Designer | Figma Expert', password } });
  const rahul = await prisma.user.create({ data: { name: 'Rahul Kumar', email: 'rahul@learnworks.demo', username: 'rahul', role: 'student', bio: 'Data enthusiast exploring machine learning and analytics.', location: 'Delhi', headline: 'Data Analyst | Python & SQL', password } });
  const ananya = await prisma.user.create({ data: { name: 'Ananya Singh', email: 'ananya@learnworks.demo', username: 'ananya', role: 'student', bio: 'Digital marketer turned frontend developer.', location: 'Pune', headline: 'Frontend Developer | React & TypeScript', password } });
  const rohan = await prisma.user.create({ data: { name: 'Rohan Mehta', email: 'rohan@learnworks.demo', username: 'rohan', role: 'student', bio: 'Backend engineer with strong fundamentals.', location: 'Hyderabad', headline: 'Backend Developer | Node.js & PostgreSQL', password } });
  const sneha = await prisma.user.create({ data: { name: 'Sneha Gupta', email: 'sneha@learnworks.demo', username: 'sneha', role: 'student', bio: 'Creative content creator exploring tech.', location: 'Jaipur', headline: 'Content Creator | Video Editing & SEO', password } });
  const startupXYZ = await prisma.user.create({ data: { name: 'Startup XYZ', email: 'business@learnworks.demo', username: 'startupxyz', role: 'business', bio: 'Early-stage startup building the future of edtech.', location: 'Bangalore', headline: 'EdTech Startup', password } });
  const techNova = await prisma.user.create({ data: { name: 'TechNova Solutions', email: 'technova@learnworks.demo', username: 'technova', role: 'business', bio: 'Technology consulting and software development.', location: 'Mumbai', headline: 'Tech Consulting Firm', password } });
  const designHub = await prisma.user.create({ data: { name: 'DesignHub Agency', email: 'designhub@learnworks.demo', username: 'designhub', role: 'business', bio: 'Creative design agency.', location: 'Delhi', headline: 'Design Agency', password } });
  const growthLabs = await prisma.user.create({ data: { name: 'GrowthLabs', email: 'growthlabs@learnworks.demo', username: 'growthlabs', role: 'business', bio: 'Performance marketing agency.', location: 'Pune', headline: 'Growth Marketing Agency', password } });
  const admin = await prisma.user.create({ data: { name: 'Admin User', email: 'admin@learnworks.demo', username: 'admin', role: 'admin', bio: 'Platform administrator.', location: 'Bangalore', headline: 'Platform Admin', password } });

  // Create Skills
  const skillNames = ['Python', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'Node.js', 'UI/UX', 'Figma', 'Excel', 'Digital Marketing', 'SEO', 'Graphic Design', 'Video Editing', 'Content Writing', 'Data Analysis', 'SQL', 'HTML', 'CSS', 'Java', 'C++', 'Flutter', 'Swift', 'Machine Learning', 'AI'];
  const skills: Record<string, string> = {};
  for (const name of skillNames) {
    const s = await prisma.skill.create({ data: { name, category: 'General' } });
    skills[name] = s.id;
  }

  // Create Student Profiles
  await prisma.studentProfile.create({ data: { userId: arjun.id, experienceLevel: 'intermediate', availability: '10-15 hours/week', careerGoal: 'Get hired', skillCredits: 12, experiencePoints: 340, profileCompletion: 82, rating: 4.7, reviewCount: 8 } });
  await prisma.studentProfile.create({ data: { userId: priya.id, experienceLevel: 'advanced', availability: '15-20 hours/week', careerGoal: 'Become freelancer', skillCredits: 8, experiencePoints: 520, profileCompletion: 90, rating: 4.9, reviewCount: 12 } });
  await prisma.studentProfile.create({ data: { userId: rahul.id, experienceLevel: 'intermediate', availability: '10-15 hours/week', careerGoal: 'Find internship', skillCredits: 5, experiencePoints: 280, profileCompletion: 75, rating: 4.5, reviewCount: 5 } });
  await prisma.studentProfile.create({ data: { userId: ananya.id, experienceLevel: 'beginner', availability: '20+ hours/week', careerGoal: 'Learn a skill', skillCredits: 3, experiencePoints: 150, profileCompletion: 68, rating: 4.3, reviewCount: 3 } });
  await prisma.studentProfile.create({ data: { userId: rohan.id, experienceLevel: 'advanced', availability: '10-15 hours/week', careerGoal: 'Get hired', skillCredits: 15, experiencePoints: 680, profileCompletion: 95, rating: 4.8, reviewCount: 15 } });
  await prisma.studentProfile.create({ data: { userId: sneha.id, experienceLevel: 'beginner', availability: '15-20 hours/week', careerGoal: 'Build portfolio', skillCredits: 2, experiencePoints: 100, profileCompletion: 55, rating: 4.1, reviewCount: 2 } });

  // Create Business Profiles
  await prisma.businessProfile.create({ data: { userId: startupXYZ.id, companyName: 'Startup XYZ', industry: 'EdTech', website: 'https://startupxyz.in', description: 'Building next-generation learning platforms.' } });
  await prisma.businessProfile.create({ data: { userId: techNova.id, companyName: 'TechNova Solutions', industry: 'Technology Consulting', website: 'https://technova.io', description: 'Enterprise software solutions.' } });
  await prisma.businessProfile.create({ data: { userId: designHub.id, companyName: 'DesignHub Agency', industry: 'Design & Creative', website: 'https://designhub.co', description: 'Creative design solutions.' } });
  await prisma.businessProfile.create({ data: { userId: growthLabs.id, companyName: 'GrowthLabs', industry: 'Marketing', website: 'https://growthlabs.in', description: 'Data-driven growth marketing.' } });

  // Assign Skills
  const assignSkill = async (userId: string, skillName: string, type: string) => {
    if (!skills[skillName]) return;
    await prisma.userSkill.create({ data: { userId, skillId: skills[skillName], type } });
  };

  await assignSkill(arjun.id, 'Python', 'known'); await assignSkill(arjun.id, 'JavaScript', 'known'); await assignSkill(arjun.id, 'React', 'known'); await assignSkill(arjun.id, 'Node.js', 'known');
  await assignSkill(arjun.id, 'UI/UX', 'learning'); await assignSkill(arjun.id, 'TypeScript', 'learning');

  await assignSkill(priya.id, 'UI/UX', 'known'); await assignSkill(priya.id, 'Figma', 'known'); await assignSkill(priya.id, 'Graphic Design', 'known'); await assignSkill(priya.id, 'HTML', 'known'); await assignSkill(priya.id, 'CSS', 'known');
  await assignSkill(priya.id, 'Python', 'learning'); await assignSkill(priya.id, 'React', 'learning');

  await assignSkill(rahul.id, 'Python', 'known'); await assignSkill(rahul.id, 'SQL', 'known'); await assignSkill(rahul.id, 'Data Analysis', 'known'); await assignSkill(rahul.id, 'Excel', 'known');
  await assignSkill(rahul.id, 'JavaScript', 'learning'); await assignSkill(rahul.id, 'React', 'learning');

  await assignSkill(ananya.id, 'Digital Marketing', 'known'); await assignSkill(ananya.id, 'SEO', 'known'); await assignSkill(ananya.id, 'Content Writing', 'known'); await assignSkill(ananya.id, 'HTML', 'known'); await assignSkill(ananya.id, 'CSS', 'known');
  await assignSkill(ananya.id, 'React', 'learning'); await assignSkill(ananya.id, 'TypeScript', 'learning');

  await assignSkill(rohan.id, 'JavaScript', 'known'); await assignSkill(rohan.id, 'Node.js', 'known'); await assignSkill(rohan.id, 'SQL', 'known'); await assignSkill(rohan.id, 'Python', 'known'); await assignSkill(rohan.id, 'TypeScript', 'known');

  await assignSkill(sneha.id, 'Video Editing', 'known'); await assignSkill(sneha.id, 'Content Writing', 'known'); await assignSkill(sneha.id, 'SEO', 'known');
  await assignSkill(sneha.id, 'Graphic Design', 'learning');   await assignSkill(sneha.id, 'HTML', 'learning'); await assignSkill(sneha.id, 'CSS', 'learning');

  // Create Courses
  const course1 = await prisma.course.create({ data: { title: 'React Fundamentals for Beginners', description: 'Master React from scratch.', instructorId: arjun.id, category: 'Web Development', difficulty: 'beginner', duration: '8 hours', price: 499, rating: 4.8, reviewCount: 124, enrollmentCount: 567, status: 'published' } });
  const course2 = await prisma.course.create({ data: { title: 'Python for Data Science', description: 'Learn Python for data analysis.', instructorId: rahul.id, category: 'Data Science', difficulty: 'intermediate', duration: '12 hours', price: 799, rating: 4.6, reviewCount: 89, enrollmentCount: 342, status: 'published' } });
  const course3 = await prisma.course.create({ data: { title: 'UI/UX Design with Figma', description: 'Create stunning interfaces.', instructorId: priya.id, category: 'Design', difficulty: 'intermediate', duration: '10 hours', price: 699, rating: 4.9, reviewCount: 156, enrollmentCount: 423, status: 'published' } });
  const course4 = await prisma.course.create({ data: { title: 'Digital Marketing Mastery', description: 'Complete digital marketing guide.', instructorId: sneha.id, category: 'Marketing', difficulty: 'beginner', duration: '6 hours', price: 399, rating: 4.4, reviewCount: 67, enrollmentCount: 289, status: 'published' } });
  const course5 = await prisma.course.create({ data: { title: 'TypeScript Complete Guide', description: 'Master TypeScript.', instructorId: ananya.id, category: 'Web Development', difficulty: 'intermediate', duration: '8 hours', price: 599, rating: 4.7, reviewCount: 45, enrollmentCount: 198, status: 'published' } });

  // Course Lessons
  await prisma.courseLesson.create({ data: { courseId: course1.id, title: 'Introduction to React', description: 'What is React', duration: '30 min', content: 'React is a JavaScript library for building user interfaces.', order: 1, videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0' } });
  await prisma.courseLesson.create({ data: { courseId: course1.id, title: 'JSX and Components', description: 'Learn JSX syntax', duration: '45 min', content: 'JSX is a syntax extension for JavaScript.', order: 2, videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0' } });
  await prisma.courseLesson.create({ data: { courseId: course1.id, title: 'Props and State', description: 'Data flow in React', duration: '45 min', content: 'Props are read-only inputs. State is internal data.', order: 3, videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0' } });
  await prisma.courseLesson.create({ data: { courseId: course1.id, title: 'Hooks Deep Dive', description: 'useState, useEffect', duration: '60 min', content: 'Hooks let you use state and lifecycle in function components.', order: 4, videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0' } });
  await prisma.courseLesson.create({ data: { courseId: course1.id, title: 'Building a Todo App', description: 'Hands-on project', duration: '90 min', content: 'Build a complete Todo application.', order: 5, videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0' } });

  await prisma.courseLesson.create({ data: { courseId: course2.id, title: 'Python Basics Review', description: 'Quick review', duration: '45 min', content: 'Review Python basics.', order: 1 } });
  await prisma.courseLesson.create({ data: { courseId: course2.id, title: 'NumPy Fundamentals', description: 'Arrays and operations', duration: '60 min', content: 'NumPy provides array objects.', order: 2 } });
  await prisma.courseLesson.create({ data: { courseId: course2.id, title: 'Pandas for Data', description: 'DataFrames', duration: '75 min', content: 'Pandas provides data structures.', order: 3 } });

  await prisma.courseLesson.create({ data: { courseId: course3.id, title: 'Figma Interface Tour', description: 'Getting comfortable', duration: '30 min', content: 'Explore the Figma interface.', order: 1 } });
  await prisma.courseLesson.create({ data: { courseId: course3.id, title: 'Wireframing Basics', description: 'Low-fidelity wireframes', duration: '45 min', content: 'Wireframes focus on layout.', order: 2 } });
  await prisma.courseLesson.create({ data: { courseId: course3.id, title: 'Component Design', description: 'Reusable components', duration: '60 min', content: 'Components are reusable design elements.', order: 3 } });

  // Course Enrollments
  await prisma.courseEnrollment.create({ data: { userId: arjun.id, courseId: course1.id, progress: 60, completedLessons: JSON.stringify(['l1', 'l2', 'l3']) } });
  await prisma.courseEnrollment.create({ data: { userId: arjun.id, courseId: course2.id, progress: 33, completedLessons: JSON.stringify(['l6']) } });
  await prisma.courseEnrollment.create({ data: { userId: ananya.id, courseId: course1.id, progress: 100, completedLessons: JSON.stringify(['l1', 'l2', 'l3', 'l4', 'l5']) } });

  // Challenges
  const ch1 = await prisma.challenge.create({ data: { title: 'Build a Responsive Portfolio Website', description: 'Create a stunning portfolio.', difficulty: 'beginner', estimatedTime: '5 days', submissionType: 'GitHub repository + live demo', status: 'active' } });
  const ch2 = await prisma.challenge.create({ data: { title: 'Build a React Dashboard', description: 'Create a modern dashboard.', difficulty: 'intermediate', estimatedTime: '7 days', submissionType: 'GitHub repository', status: 'active' } });
  const ch3 = await prisma.challenge.create({ data: { title: 'Design a Mobile App UI', description: 'Design a complete mobile UI.', difficulty: 'intermediate', estimatedTime: '5 days', submissionType: 'Figma link', status: 'active' } });

  await prisma.challengeSkill.create({ data: { challengeId: ch1.id, skillName: 'HTML' } });
  await prisma.challengeSkill.create({ data: { challengeId: ch1.id, skillName: 'CSS' } });
  await prisma.challengeSkill.create({ data: { challengeId: ch2.id, skillName: 'React' } });
  await prisma.challengeSkill.create({ data: { challengeId: ch3.id, skillName: 'UI/UX' } });
  await prisma.challengeSkill.create({ data: { challengeId: ch3.id, skillName: 'Figma' } });

  await prisma.challengeRequirement.create({ data: { challengeId: ch1.id, text: 'Responsive design' } });
  await prisma.challengeRequirement.create({ data: { challengeId: ch1.id, text: 'Clean UI' } });
  await prisma.challengeRequirement.create({ data: { challengeId: ch1.id, text: 'Contact form' } });

  // Challenge Submissions
  await prisma.challengeSubmission.create({ data: { challengeId: ch1.id, userId: arjun.id, submissionUrl: 'https://github.com/deepesh/portfolio', description: 'My responsive portfolio.', status: 'passed', feedback: 'Excellent work!' } });

  // Projects
  const p1 = await prisma.project.create({ data: { title: 'E-Commerce Platform', description: 'Full-stack e-commerce platform.', repositoryUrl: 'https://github.com/deepesh/ecommerce', demoUrl: 'https://deepesh-ecommerce.vercel.app', role: 'Full-Stack Developer', duration: '3 weeks', outcome: 'Deployed and serving 50+ users', userId: arjun.id } });
  await prisma.projectSkill.create({ data: { projectId: p1.id, skillName: 'React' } });
  await prisma.projectSkill.create({ data: { projectId: p1.id, skillName: 'Node.js' } });

  const p2 = await prisma.project.create({ data: { title: 'Design System Library', description: 'Comprehensive design system.', role: 'Lead Designer', duration: '4 weeks', outcome: 'Adopted by 3 teams', userId: priya.id } });
  await prisma.projectSkill.create({ data: { projectId: p2.id, skillName: 'Figma' } });

  // Micro-Internships
  const mi1 = await prisma.microInternship.create({ data: { title: 'Build a Landing Page', description: 'Create a high-converting landing page.', businessId: startupXYZ.id, skills: JSON.stringify(['HTML', 'CSS', 'React']), difficulty: 'beginner', duration: '10 days', budget: 5000, deadline: '2025-12-01', deliverables: JSON.stringify(['Responsive landing page', 'Cross-browser support']), niceToHaveSkills: JSON.stringify(['Framer Motion']), status: 'open' } });
  const mi2 = await prisma.microInternship.create({ data: { title: 'UI/UX Audit & Redesign', description: 'Conduct UX audit.', businessId: designHub.id, skills: JSON.stringify(['UI/UX', 'Figma']), difficulty: 'advanced', duration: '14 days', budget: 15000, deadline: '2025-12-15', deliverables: JSON.stringify(['UX audit report', 'Redesigned screens']), niceToHaveSkills: JSON.stringify([]), status: 'open' } });
  const mi3 = await prisma.microInternship.create({ data: { title: 'Data Pipeline Setup', description: 'Set up data pipeline.', businessId: techNova.id, skills: JSON.stringify(['Python', 'SQL']), difficulty: 'intermediate', duration: '7 days', budget: 8000, deadline: '2025-11-30', deliverables: JSON.stringify(['Working pipeline', 'Documentation']), niceToHaveSkills: JSON.stringify([]), status: 'open' } });

  // Applications
  await prisma.application.create({ data: { microInternshipId: mi1.id, studentId: ananya.id, proposal: 'I am excited to build this landing page.', status: 'shortlisted' } });
  await prisma.application.create({ data: { microInternshipId: mi1.id, studentId: arjun.id, proposal: 'As a full-stack developer with React expertise, I can deliver a high-quality landing page.', status: 'accepted' } });
  await prisma.application.create({ data: { microInternshipId: mi2.id, studentId: priya.id, proposal: 'UI/UX design is my core expertise.', status: 'accepted' } });
  await prisma.application.create({ data: { microInternshipId: mi3.id, studentId: rahul.id, proposal: 'My data analysis and Python skills make me a great fit.', status: 'in_progress' } });

  // Skill Swaps
  await prisma.skillSwap.create({ data: { student1Id: arjun.id, student2Id: priya.id, skill1: 'Python', skill2: 'UI/UX', status: 'completed', hoursLogged: 4 } });
  await prisma.skillSwap.create({ data: { student1Id: arjun.id, student2Id: rahul.id, skill1: 'JavaScript', skill2: 'Data Analysis', status: 'accepted', hoursLogged: 2 } });

  // Credit Transactions
  await prisma.skillCreditTransaction.create({ data: { userId: arjun.id, amount: 1, type: 'earned', description: 'Taught Python to Priya' } });
  await prisma.skillCreditTransaction.create({ data: { userId: arjun.id, amount: -1, type: 'spent', description: 'Learned UI/UX from Priya' } });
  await prisma.skillCreditTransaction.create({ data: { userId: arjun.id, amount: 1, type: 'earned', description: 'Taught JavaScript to Rahul' } });

  // XP Transactions
  await prisma.experiencePointTransaction.create({ data: { userId: arjun.id, amount: 50, description: 'Completed React Fundamentals course' } });
  await prisma.experiencePointTransaction.create({ data: { userId: arjun.id, amount: 30, description: 'Completed Portfolio Website challenge' } });
  await prisma.experiencePointTransaction.create({ data: { userId: arjun.id, amount: 100, description: 'Completed Landing Page micro-internship' } });
  await prisma.experiencePointTransaction.create({ data: { userId: arjun.id, amount: 20, description: 'SkillSwap session with Priya' } });
  await prisma.experiencePointTransaction.create({ data: { userId: arjun.id, amount: 50, description: 'Profile completion bonus' } });
  await prisma.experiencePointTransaction.create({ data: { userId: arjun.id, amount: 70, description: 'Project: E-Commerce Platform' } });

  // Reviews
  await prisma.review.create({ data: { reviewerId: priya.id, revieweeId: arjun.id, rating: 5, comment: 'Deepesh is an excellent Python teacher.', context: 'SkillSwap' } });
  await prisma.review.create({ data: { reviewerId: startupXYZ.id, revieweeId: arjun.id, rating: 5, comment: 'Delivered the landing page ahead of schedule.', context: 'Micro-Internship' } });
  await prisma.review.create({ data: { reviewerId: arjun.id, revieweeId: priya.id, rating: 5, comment: 'Priya is incredibly talented at UI/UX.', context: 'SkillSwap' } });

  // Certificates
  await prisma.certificate.create({ data: { userId: arjun.id, type: 'course', title: 'React Fundamentals for Beginners' } });
  await prisma.certificate.create({ data: { userId: arjun.id, type: 'challenge', title: 'Build a Responsive Portfolio Website' } });

  // Conversations & Messages
  const conv1 = await prisma.conversation.create({ data: { lastMessage: 'Great work on the landing page!', lastMessageAt: new Date('2025-09-28') } });
  await prisma.conversationParticipant.create({ data: { conversationId: conv1.id, userId: arjun.id } });
  await prisma.conversationParticipant.create({ data: { conversationId: conv1.id, userId: startupXYZ.id } });
  await prisma.message.create({ data: { conversationId: conv1.id, senderId: startupXYZ.id, content: 'Hi Deepesh! I loved the landing page.', read: true } });
  await prisma.message.create({ data: { conversationId: conv1.id, senderId: arjun.id, content: 'Thank you! I really enjoyed working on this.', read: true } });
  await prisma.message.create({ data: { conversationId: conv1.id, senderId: startupXYZ.id, content: 'Great work on the landing page!', read: false } });

  const conv2 = await prisma.conversation.create({ data: { lastMessage: 'When is our next SkillSwap session?', lastMessageAt: new Date('2025-09-20') } });
  await prisma.conversationParticipant.create({ data: { conversationId: conv2.id, userId: arjun.id } });
  await prisma.conversationParticipant.create({ data: { conversationId: conv2.id, userId: priya.id } });
  await prisma.message.create({ data: { conversationId: conv2.id, senderId: priya.id, content: 'Hey Deepesh! Ready for our next Python session?', read: true } });
  await prisma.message.create({ data: { conversationId: conv2.id, senderId: arjun.id, content: 'Yes! How about Thursday at 6 PM?', read: true } });

  // Notifications
  await prisma.notification.create({ data: { userId: arjun.id, type: 'skillswap', title: 'SkillSwap Accepted', message: 'Rahul accepted your SkillSwap request', read: false, link: '/skillswap' } });
  await prisma.notification.create({ data: { userId: arjun.id, type: 'application', title: 'Application Accepted', message: 'Your proposal was accepted by Startup XYZ', read: false, link: '/micro-internships' } });
  await prisma.notification.create({ data: { userId: arjun.id, type: 'review', title: 'New Review', message: 'Startup XYZ left you a 5-star review', read: true, link: '/portfolio' } });

  // Payments
  await prisma.payment.create({ data: { fromUserId: startupXYZ.id, toUserId: arjun.id, amount: 9000, platformFee: 1000, status: 'completed', context: 'Landing Page micro-internship' } });
  await prisma.payment.create({ data: { fromUserId: techNova.id, toUserId: rahul.id, amount: 7200, platformFee: 800, status: 'completed', context: 'Data Pipeline micro-internship' } });
  await prisma.payment.create({ data: { fromUserId: designHub.id, toUserId: priya.id, amount: 13500, platformFee: 1500, status: 'completed', context: 'UI/UX Audit micro-internship' } });

  console.log('Seed complete!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
