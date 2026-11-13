import { User, StudentProfile, BusinessProfile, Course, CourseLesson, Challenge, Project, MicroInternship, Application, SkillSwap, SkillCreditTransaction, Review, Message, Conversation, Notification, Certificate, ExperiencePointTransaction, Payment, CourseEnrollment, ChallengeSubmission } from '@/types';

const users: User[] = [
  { id: 'u1', name: 'Deepesh Yadav', email: 'deepesh@learnworks.demo', username: 'deepesh', role: 'student', avatar: '', bio: 'Passionate full-stack developer and lifelong learner. Currently mastering React and Python.', location: 'Bangalore', headline: 'Full-Stack Developer | React & Python', createdAt: '2025-01-15' },
  { id: 'u2', name: 'Priya Patel', email: 'priya@learnworks.demo', username: 'priya', role: 'student', avatar: '', bio: 'UI/UX designer with a love for creating intuitive digital experiences.', location: 'Mumbai', headline: 'UI/UX Designer | Figma Expert', createdAt: '2025-02-10' },
  { id: 'u3', name: 'Rahul Kumar', email: 'rahul@learnworks.demo', username: 'rahul', role: 'student', avatar: '', bio: 'Data enthusiast exploring machine learning and analytics.', location: 'Delhi', headline: 'Data Analyst | Python & SQL', createdAt: '2025-03-05' },
  { id: 'u4', name: 'Ananya Singh', email: 'ananya@learnworks.demo', username: 'ananya', role: 'student', avatar: '', bio: 'Digital marketer turned frontend developer. Love building beautiful web apps.', location: 'Pune', headline: 'Frontend Developer | React & TypeScript', createdAt: '2025-01-20' },
  { id: 'u5', name: 'Rohan Mehta', email: 'rohan@learnworks.demo', username: 'rohan', role: 'student', avatar: '', bio: 'Backend engineer with strong fundamentals in system design and databases.', location: 'Hyderabad', headline: 'Backend Developer | Node.js & PostgreSQL', createdAt: '2025-04-12' },
  { id: 'u6', name: 'Sneha Gupta', email: 'sneha@learnworks.demo', username: 'sneha', role: 'student', avatar: '', bio: 'Creative content creator and video editor exploring tech.', location: 'Jaipur', headline: 'Content Creator | Video Editing & SEO', createdAt: '2025-02-28' },
  { id: 'u7', name: 'Startup XYZ', email: 'business@learnworks.demo', username: 'startupxyz', role: 'business', avatar: '', bio: 'Early-stage startup building the future of edtech.', location: 'Bangalore', headline: 'EdTech Startup', createdAt: '2025-01-10' },
  { id: 'u8', name: 'TechNova Solutions', email: 'technova@learnworks.demo', username: 'technova', role: 'business', avatar: '', bio: 'Technology consulting and software development company.', location: 'Mumbai', headline: 'Tech Consulting Firm', createdAt: '2025-02-01' },
  { id: 'u9', name: 'DesignHub Agency', email: 'designhub@learnworks.demo', username: 'designhub', role: 'business', avatar: '', bio: 'Creative design agency specializing in brand identity and web design.', location: 'Delhi', headline: 'Design Agency', createdAt: '2025-03-15' },
  { id: 'u10', name: 'GrowthLabs', email: 'growthlabs@learnworks.demo', username: 'growthlabs', role: 'business', avatar: '', bio: 'Performance marketing and growth hacking agency.', location: 'Pune', headline: 'Growth Marketing Agency', createdAt: '2025-04-01' },
  { id: 'u11', name: 'Admin User', email: 'admin@learnworks.demo', username: 'admin', role: 'admin', avatar: '', bio: 'Platform administrator.', location: 'Bangalore', headline: 'Platform Admin', createdAt: '2025-01-01' },
];

const studentProfiles: StudentProfile[] = [
  { userId: 'u1', skills: ['Python', 'JavaScript', 'React', 'Node.js'], learningGoals: ['UI/UX', 'TypeScript'], interests: ['Web Development', 'AI/ML', 'Open Source'], experienceLevel: 'intermediate', availability: '10-15 hours/week', careerGoal: 'Get hired', skillCredits: 12, experiencePoints: 340, profileCompletion: 82, rating: 4.7, reviewCount: 8 },
  { userId: 'u2', skills: ['UI/UX', 'Figma', 'Graphic Design', 'HTML', 'CSS'], learningGoals: ['Python', 'React'], interests: ['Design Systems', 'Product Design', 'Startups'], experienceLevel: 'advanced', availability: '15-20 hours/week', careerGoal: 'Become freelancer', skillCredits: 8, experiencePoints: 520, profileCompletion: 90, rating: 4.9, reviewCount: 12 },
  { userId: 'u3', skills: ['Python', 'SQL', 'Data Analysis', 'Excel'], learningGoals: ['JavaScript', 'React', 'Machine Learning'], interests: ['Data Science', 'Analytics', 'Fintech'], experienceLevel: 'intermediate', availability: '10-15 hours/week', careerGoal: 'Find internship', skillCredits: 5, experiencePoints: 280, profileCompletion: 75, rating: 4.5, reviewCount: 5 },
  { userId: 'u4', skills: ['Digital Marketing', 'SEO', 'Content Writing', 'HTML', 'CSS'], learningGoals: ['React', 'TypeScript', 'JavaScript'], interests: ['Web Development', 'Marketing Tech', 'Startups'], experienceLevel: 'beginner', availability: '20+ hours/week', careerGoal: 'Learn a skill', skillCredits: 3, experiencePoints: 150, profileCompletion: 68, rating: 4.3, reviewCount: 3 },
  { userId: 'u5', skills: ['JavaScript', 'Node.js', 'PostgreSQL', 'Python', 'TypeScript'], learningGoals: ['System Design', 'Cloud Architecture'], interests: ['Backend Systems', 'DevOps', 'Scalability'], experienceLevel: 'advanced', availability: '10-15 hours/week', careerGoal: 'Get hired', skillCredits: 15, experiencePoints: 680, profileCompletion: 95, rating: 4.8, reviewCount: 15 },
  { userId: 'u6', skills: ['Video Editing', 'Content Writing', 'SEO', 'Social Media'], learningGoals: ['Graphic Design', 'Web Development', 'Python'], interests: ['Content Creation', 'Digital Marketing', 'Creative Tech'], experienceLevel: 'beginner', availability: '15-20 hours/week', careerGoal: 'Build portfolio', skillCredits: 2, experiencePoints: 100, profileCompletion: 55, rating: 4.1, reviewCount: 2 },
];

const businessProfiles: BusinessProfile[] = [
  { userId: 'u7', companyName: 'Startup XYZ', industry: 'EdTech', website: 'https://startupxyz.in', description: 'Building next-generation learning platforms for Indian students.' },
  { userId: 'u8', companyName: 'TechNova Solutions', industry: 'Technology Consulting', website: 'https://technova.io', description: 'Enterprise software solutions and digital transformation.' },
  { userId: 'u9', companyName: 'DesignHub Agency', industry: 'Design & Creative', website: 'https://designhub.co', description: 'Creative design solutions for brands and startups.' },
  { userId: 'u10', companyName: 'GrowthLabs', industry: 'Marketing', website: 'https://growthlabs.in', description: 'Data-driven growth marketing for ambitious brands.' },
];

const courses: Course[] = [
  {
    id: 'c1', title: 'React Fundamentals for Beginners', description: 'Master React from scratch. Learn components, hooks, state management, and build real projects.', instructorId: 'u1', instructorName: 'Deepesh Yadav', category: 'Web Development', skills: ['React', 'JavaScript', 'HTML', 'CSS'], difficulty: 'beginner', duration: '8 hours', price: 499, rating: 4.8, reviewCount: 124, enrollmentCount: 567, status: 'published', createdAt: '2025-06-15',
    lessons: [
      { id: 'l1', courseId: 'c1', title: 'Introduction to React', description: 'What is React and why use it', duration: '30 min', content: 'React is a JavaScript library for building user interfaces. It was developed by Facebook and is now maintained by Meta. React allows you to build complex UIs from small, isolated pieces of code called components.', order: 1 },
      { id: 'l2', courseId: 'c1', title: 'JSX and Components', description: 'Learn JSX syntax and component creation', duration: '45 min', content: 'JSX is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML-like code in your JavaScript files. Components are reusable pieces of UI that can accept inputs (props) and return React elements.', order: 2 },
      { id: 'l3', courseId: 'c1', title: 'Props and State', description: 'Understanding data flow in React', duration: '45 min', content: 'Props are read-only inputs to components. State is a component\'s internal data that can change over time. Understanding the difference between props and state is fundamental to React development.', order: 3 },
      { id: 'l4', courseId: 'c1', title: 'Hooks Deep Dive', description: 'useState, useEffect, and custom hooks', duration: '60 min', content: 'Hooks are functions that let you "hook into" React state and lifecycle features from function components. The most common hooks are useState for managing state and useEffect for side effects.', order: 4 },
      { id: 'l5', courseId: 'c1', title: 'Building a Todo App', description: 'Hands-on project building a complete Todo application', duration: '90 min', content: 'In this lesson, we will build a complete Todo application from scratch. We\'ll use useState for state management, implement CRUD operations, and add local storage persistence.', order: 5 },
    ]
  },
  {
    id: 'c2', title: 'Python for Data Science', description: 'Learn Python programming with a focus on data analysis, visualization, and machine learning basics.', instructorId: 'u3', instructorName: 'Rahul Kumar', category: 'Data Science', skills: ['Python', 'Data Analysis', 'NumPy', 'Pandas'], difficulty: 'intermediate', duration: '12 hours', price: 799, rating: 4.6, reviewCount: 89, enrollmentCount: 342, status: 'published', createdAt: '2025-05-20',
    lessons: [
      { id: 'l6', courseId: 'c2', title: 'Python Basics Review', description: 'Quick review of Python fundamentals', duration: '45 min', content: 'Before diving into data science, let\'s review Python basics including variables, data types, loops, and functions.', order: 1 },
      { id: 'l7', courseId: 'c2', title: 'NumPy Fundamentals', description: 'Arrays, operations, and broadcasting', duration: '60 min', content: 'NumPy is the fundamental package for scientific computing in Python. It provides powerful N-dimensional array objects and tools for working with these arrays.', order: 2 },
      { id: 'l8', courseId: 'c2', title: 'Pandas for Data Manipulation', description: 'DataFrames, indexing, and data cleaning', duration: '75 min', content: 'Pandas provides data structures and tools for data manipulation. The DataFrame is the primary data structure, similar to a spreadsheet or SQL table.', order: 3 },
    ]
  },
  {
    id: 'c3', title: 'UI/UX Design with Figma', description: 'Create stunning user interfaces and experiences using Figma. From wireframes to high-fidelity prototypes.', instructorId: 'u2', instructorName: 'Priya Patel', category: 'Design', skills: ['UI/UX', 'Figma', 'Design Systems', 'Prototyping'], difficulty: 'intermediate', duration: '10 hours', price: 699, rating: 4.9, reviewCount: 156, enrollmentCount: 423, status: 'published', createdAt: '2025-07-01',
    lessons: [
      { id: 'l9', courseId: 'c3', title: 'Figma Interface Tour', description: 'Getting comfortable with Figma', duration: '30 min', content: 'Figma is a collaborative interface design tool. Let\'s explore the interface, panels, and tools available.', order: 1 },
      { id: 'l10', courseId: 'c3', title: 'Wireframing Basics', description: 'Low-fidelity wireframe creation', duration: '45 min', content: 'Wireframes are low-fidelity representations of your design. They focus on layout and content hierarchy rather than visual design.', order: 2 },
      { id: 'l11', courseId: 'c3', title: 'Component Design', description: 'Building reusable design components', duration: '60 min', content: 'Components are reusable design elements. Master auto-layout, variants, and component properties to build a scalable design system.', order: 3 },
    ]
  },
  {
    id: 'c4', title: 'Digital Marketing Mastery', description: 'Complete guide to digital marketing including SEO, social media, content marketing, and analytics.', instructorId: 'u6', instructorName: 'Sneha Gupta', category: 'Marketing', skills: ['Digital Marketing', 'SEO', 'Social Media', 'Content Writing'], difficulty: 'beginner', duration: '6 hours', price: 399, rating: 4.4, reviewCount: 67, enrollmentCount: 289, status: 'published', createdAt: '2025-08-10',
    lessons: [
      { id: 'l12', courseId: 'c4', title: 'Introduction to Digital Marketing', description: 'Overview of digital marketing landscape', duration: '30 min', content: 'Digital marketing encompasses all marketing efforts that use electronic devices or the internet to connect with current and prospective customers.', order: 1 },
      { id: 'l13', courseId: 'c4', title: 'SEO Fundamentals', description: 'Search engine optimization basics', duration: '45 min', content: 'SEO is the practice of increasing the quantity and quality of traffic to your website through organic search engine results.', order: 2 },
    ]
  },
  {
    id: 'c5', title: 'TypeScript Complete Guide', description: 'Master TypeScript from basics to advanced patterns. Build type-safe applications.', instructorId: 'u4', instructorName: 'Ananya Singh', category: 'Web Development', skills: ['TypeScript', 'JavaScript', 'React'], difficulty: 'intermediate', duration: '8 hours', price: 599, rating: 4.7, reviewCount: 45, enrollmentCount: 198, status: 'published', createdAt: '2025-07-25',
    lessons: [
      { id: 'l14', courseId: 'c5', title: 'Why TypeScript?', description: 'Benefits and setup', duration: '20 min', content: 'TypeScript adds static type checking to JavaScript, catching errors at compile time rather than runtime.', order: 1 },
      { id: 'l15', courseId: 'c5', title: 'Basic Types', description: 'String, number, boolean, and more', duration: '40 min', content: 'TypeScript provides several basic types including string, number, boolean, null, undefined, and more.', order: 2 },
    ]
  },
];

const challenges: Challenge[] = [
  {
    id: 'ch1', title: 'Build a Responsive Portfolio Website', description: 'Create a stunning, responsive portfolio website from scratch using HTML, CSS, and JavaScript. Showcase your projects and skills in a modern layout.', difficulty: 'beginner', estimatedTime: '5 days', skills: ['HTML', 'CSS', 'JavaScript'], requirements: ['Responsive design', 'Clean UI', 'Contact form', 'Project showcase', 'Mobile-friendly'], evaluationCriteria: ['Code quality', 'Design aesthetics', 'Responsiveness', 'Performance', 'Accessibility'], submissionType: 'GitHub repository + live demo', status: 'active'
  },
  {
    id: 'ch2', title: 'Build a React Dashboard', description: 'Create a modern admin dashboard with charts, tables, and interactive elements using React and a CSS framework.', difficulty: 'intermediate', estimatedTime: '7 days', skills: ['React', 'JavaScript', 'CSS'], requirements: ['Dashboard layout', 'Charts', 'Data tables', 'Dark mode', 'Responsive'], evaluationCriteria: ['Component architecture', 'State management', 'UI/UX quality', 'Code organization'], submissionType: 'GitHub repository + live demo', status: 'active'
  },
  {
    id: 'ch3', title: 'Design a Mobile App UI', description: 'Design a complete mobile app UI in Figma including wireframes, user flows, and high-fidelity screens.', difficulty: 'intermediate', estimatedTime: '5 days', skills: ['UI/UX', 'Figma', 'Graphic Design'], requirements: ['User flow diagram', 'Wireframes', '5+ high-fidelity screens', 'Design system', 'Prototype'], evaluationCriteria: ['Visual design', 'User experience', 'Consistency', 'Creativity', 'Prototyping quality'], submissionType: 'Figma link', status: 'active'
  },
  {
    id: 'ch4', title: 'Python Data Analysis Project', description: 'Analyze a real dataset and create insightful visualizations using Python, Pandas, and Matplotlib.', difficulty: 'intermediate', estimatedTime: '5 days', skills: ['Python', 'Data Analysis', 'Pandas'], requirements: ['Dataset analysis', 'Statistical insights', 'Visualizations', 'Jupyter notebook', 'Documentation'], evaluationCriteria: ['Data analysis quality', 'Code cleanliness', 'Insights depth', 'Visualization quality'], submissionType: 'GitHub repository with notebook', status: 'active'
  },
  {
    id: 'ch5', title: 'Build a REST API', description: 'Design and implement a complete REST API with authentication, CRUD operations, and documentation.', difficulty: 'advanced', estimatedTime: '7 days', skills: ['Node.js', 'Express', 'PostgreSQL'], requirements: ['RESTful design', 'Authentication', 'Error handling', 'API docs', 'Tests'], evaluationCriteria: ['API design', 'Security', 'Documentation', 'Code quality', 'Test coverage'], submissionType: 'GitHub repository + Postman collection', status: 'active'
  },
];

const projects: Project[] = [
  { id: 'p1', title: 'E-Commerce Platform', description: 'Built a full-stack e-commerce platform with product catalog, cart, checkout, and admin panel.', skillsUsed: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'], repositoryUrl: 'https://github.com/deepesh/ecommerce', demoUrl: 'https://deepesh-ecommerce.vercel.app', images: [], role: 'Full-Stack Developer', duration: '3 weeks', outcome: 'Deployed and serving 50+ daily users', userId: 'u1', createdAt: '2025-06-01' },
  { id: 'p2', title: 'Design System Library', description: 'Created a comprehensive design system with 50+ components, design tokens, and documentation.', skillsUsed: ['Figma', 'UI/UX', 'Design Systems'], repositoryUrl: '', demoUrl: 'https://figma.com/file/designhub-ds', images: [], role: 'Lead Designer', duration: '4 weeks', outcome: 'Adopted by 3 internal teams', userId: 'u2', createdAt: '2025-05-15' },
  { id: 'p3', title: 'Analytics Dashboard', description: 'Real-time analytics dashboard with interactive charts, data filtering, and export capabilities.', skillsUsed: ['Python', 'SQL', 'React', 'Recharts'], repositoryUrl: 'https://github.com/rahul/analytics-dash', demoUrl: '', images: [], role: 'Data Analyst & Developer', duration: '2 weeks', outcome: 'Reduced reporting time by 60%', userId: 'u3', createdAt: '2025-07-10' },
  { id: 'p4', title: 'Task Management API', description: 'RESTful API for task management with JWT auth, role-based access, and real-time notifications.', skillsUsed: ['Node.js', 'Express', 'PostgreSQL', 'WebSocket'], repositoryUrl: 'https://github.com/rohan/task-api', demoUrl: '', images: [], role: 'Backend Developer', duration: '2 weeks', outcome: 'Handles 1000+ requests/sec', userId: 'u5', createdAt: '2025-06-20' },
];

const microInternships: MicroInternship[] = [
  { id: 'mi1', title: 'Build a Landing Page', description: 'Create a high-converting landing page for our new product launch. Must be responsive and fast.', businessId: 'u7', businessName: 'Startup XYZ', skills: ['HTML', 'CSS', 'React', 'Tailwind'], difficulty: 'beginner', duration: '10 days', budget: 5000, deadline: '2025-12-01', deliverables: ['Responsive landing page', 'Cross-browser support', 'Performance optimization', 'Source code'], niceToHaveSkills: ['Framer Motion', 'SEO'], status: 'open', createdAt: '2025-09-15' },
  { id: 'mi2', title: 'UI/UX Audit & Redesign', description: 'Conduct a complete UX audit of our dashboard and redesign the key flows.', businessId: 'u9', businessName: 'DesignHub Agency', skills: ['UI/UX', 'Figma', 'User Research'], difficulty: 'advanced', duration: '14 days', budget: 15000, deadline: '2025-12-15', deliverables: ['UX audit report', 'Redesigned screens', 'Prototype', 'Design system updates'], niceToHaveSkills: ['Motion Design', 'Accessibility'], status: 'open', createdAt: '2025-09-20' },
  { id: 'mi3', title: 'Data Pipeline Setup', description: 'Set up an automated data pipeline for our analytics platform using Python.', businessId: 'u8', businessName: 'TechNova Solutions', skills: ['Python', 'SQL', 'Data Analysis'], difficulty: 'intermediate', duration: '7 days', budget: 8000, deadline: '2025-11-30', deliverables: ['Working data pipeline', 'Documentation', 'Test data', 'Setup guide'], niceToHaveSkills: ['Apache Airflow', 'Docker'], status: 'open', createdAt: '2025-09-18' },
  { id: 'mi4', title: 'Social Media Content Strategy', description: 'Develop a 30-day social media content strategy with templates and analytics framework.', businessId: 'u10', businessName: 'GrowthLabs', skills: ['Digital Marketing', 'Content Writing', 'SEO'], difficulty: 'beginner', duration: '5 days', budget: 3000, deadline: '2025-11-25', deliverables: ['Content calendar', '10 post templates', 'Analytics framework', 'Hashtag strategy'], niceToHaveSkills: ['Video Editing', 'Graphic Design'], status: 'open', createdAt: '2025-09-22' },
  { id: 'mi5', title: 'Mobile App Prototype', description: 'Create a clickable prototype for our mobile app concept in Figma.', businessId: 'u7', businessName: 'Startup XYZ', skills: ['UI/UX', 'Figma', 'Prototyping'], difficulty: 'intermediate', duration: '10 days', budget: 10000, deadline: '2025-12-10', deliverables: ['Clickable prototype', 'User flow diagrams', 'Design file', 'Handoff specs'], niceToHaveSkills: ['Motion Design', 'Illustration'], status: 'open', createdAt: '2025-09-25' },
];

const applications: Application[] = [
  { id: 'a1', microInternshipId: 'mi1', studentId: 'u4', proposal: 'I am excited to build this landing page. With my background in HTML/CSS and growing React skills, I can create a fast, responsive page.', status: 'shortlisted', createdAt: '2025-09-16' },
  { id: 'a2', microInternshipId: 'mi1', studentId: 'u1', proposal: 'As a full-stack developer with React expertise, I can deliver a high-quality landing page quickly.', status: 'accepted', createdAt: '2025-09-17' },
  { id: 'a3', microInternshipId: 'mi2', studentId: 'u2', proposal: 'UI/UX design is my core expertise. I have audited 10+ products and can deliver actionable insights.', status: 'accepted', createdAt: '2025-09-21' },
  { id: 'a4', microInternshipId: 'mi3', studentId: 'u3', proposal: 'My data analysis and Python skills make me a great fit for building your data pipeline.', status: 'in_progress', createdAt: '2025-09-19' },
  { id: 'a5', microInternshipId: 'mi4', studentId: 'u6', proposal: 'Content creation and digital marketing are my specialties. I can develop a comprehensive strategy.', status: 'applied', createdAt: '2025-09-23' },
];

const skillSwaps: SkillSwap[] = [
  { id: 'ss1', student1Id: 'u1', student2Id: 'u2', skill1: 'Python', skill2: 'UI/UX', status: 'completed', hoursLogged: 4, createdAt: '2025-08-01' },
  { id: 'ss2', student1Id: 'u1', student2Id: 'u3', skill1: 'JavaScript', skill2: 'Data Analysis', status: 'accepted', hoursLogged: 2, createdAt: '2025-09-10' },
  { id: 'ss3', student1Id: 'u3', student2Id: 'u5', skill1: 'SQL', skill2: 'Node.js', status: 'pending', hoursLogged: 0, createdAt: '2025-09-15' },
];

const skillCreditTransactions: SkillCreditTransaction[] = [
  { id: 'sc1', userId: 'u1', amount: 1, type: 'earned', description: 'Taught Python to Priya', createdAt: '2025-08-05' },
  { id: 'sc2', userId: 'u1', amount: -1, type: 'spent', description: 'Learned UI/UX from Priya', createdAt: '2025-08-05' },
  { id: 'sc3', userId: 'u1', amount: 1, type: 'earned', description: 'Taught JavaScript to Rahul', createdAt: '2025-09-12' },
  { id: 'sc4', userId: 'u2', amount: 1, type: 'earned', description: 'Taught UI/UX to Deepesh', createdAt: '2025-08-05' },
  { id: 'sc5', userId: 'u2', amount: -1, type: 'spent', description: 'Learned Python from Deepesh', createdAt: '2025-08-05' },
];

const reviews: Review[] = [
  { id: 'r1', reviewerId: 'u2', revieweeId: 'u1', rating: 5, comment: 'Deepesh is an excellent Python teacher. Very patient and explains concepts clearly.', context: 'SkillSwap', createdAt: '2025-08-06' },
  { id: 'r2', reviewerId: 'u7', revieweeId: 'u1', rating: 5, comment: 'Delivered the landing page ahead of schedule. Great attention to detail and responsive design.', context: 'Micro-Internship', createdAt: '2025-09-28' },
  { id: 'r3', reviewerId: 'u1', revieweeId: 'u2', rating: 5, comment: 'Priya is incredibly talented at UI/UX design. Learned so much from her.', context: 'SkillSwap', createdAt: '2025-08-06' },
  { id: 'r4', reviewerId: 'u8', revieweeId: 'u3', rating: 4, comment: 'Rahul has strong data analysis skills. The pipeline works well and documentation is thorough.', context: 'Micro-Internship', createdAt: '2025-09-25' },
  { id: 'r5', reviewerId: 'u9', revieweeId: 'u2', rating: 5, comment: 'Priya delivered an outstanding UX audit. Her insights completely transformed our dashboard.', context: 'Micro-Internship', createdAt: '2025-09-30' },
];

const conversations: Conversation[] = [
  { id: 'conv1', participants: ['u1', 'u7'], lastMessage: 'Great work on the landing page!', lastMessageAt: '2025-09-28' },
  { id: 'conv2', participants: ['u1', 'u2'], lastMessage: 'When is our next SkillSwap session?', lastMessageAt: '2025-09-20' },
  { id: 'conv3', participants: ['u3', 'u8'], lastMessage: 'Pipeline is ready for review.', lastMessageAt: '2025-09-24' },
];

const messages: Message[] = [
  { id: 'm1', conversationId: 'conv1', senderId: 'u7', content: 'Hi Deepesh! I loved the landing page you built for us.', read: true, createdAt: '2025-09-27' },
  { id: 'm2', conversationId: 'conv1', senderId: 'u1', content: 'Thank you! I really enjoyed working on this project.', read: true, createdAt: '2025-09-27' },
  { id: 'm3', conversationId: 'conv1', senderId: 'u7', content: 'Great work on the landing page!', read: false, createdAt: '2025-09-28' },
  { id: 'm4', conversationId: 'conv2', senderId: 'u2', content: 'Hey Deepesh! Ready for our next Python session?', read: true, createdAt: '2025-09-19' },
  { id: 'm5', conversationId: 'conv2', senderId: 'u1', content: 'Yes! How about Thursday at 6 PM?', read: true, createdAt: '2025-09-19' },
  { id: 'm6', conversationId: 'conv2', senderId: 'u2', content: 'When is our next SkillSwap session?', read: true, createdAt: '2025-09-20' },
];

const notifications: Notification[] = [
  { id: 'n1', userId: 'u1', type: 'skillswap', title: 'SkillSwap Accepted', message: 'Rahul accepted your SkillSwap request for JavaScript ↔ Data Analysis', read: false, link: '/skillswap', createdAt: '2025-09-10' },
  { id: 'n2', userId: 'u1', type: 'application', title: 'Application Accepted', message: 'Your proposal for "Build a Landing Page" was accepted by Startup XYZ', read: false, link: '/micro-internships', createdAt: '2025-09-18' },
  { id: 'n3', userId: 'u1', type: 'review', title: 'New Review', message: 'Startup XYZ left you a 5-star review', read: true, link: '/portfolio', createdAt: '2025-09-28' },
  { id: 'n4', userId: 'u1', type: 'message', title: 'New Message', message: 'Startup XYZ sent you a message', read: false, link: '/messages', createdAt: '2025-09-28' },
  { id: 'n5', userId: 'u1', type: 'course', title: 'Course Progress', message: 'You completed 3 lessons in React Fundamentals', read: true, link: '/courses', createdAt: '2025-09-15' },
];

const certificates: Certificate[] = [
  { id: 'cert1', userId: 'u1', type: 'course', title: 'React Fundamentals for Beginners', issuedAt: '2025-08-20' },
  { id: 'cert2', userId: 'u1', type: 'challenge', title: 'Build a Responsive Portfolio Website', issuedAt: '2025-09-01' },
  { id: 'cert3', userId: 'u2', type: 'course', title: 'Python for Data Science', issuedAt: '2025-07-15' },
];

const experiencePointTransactions: ExperiencePointTransaction[] = [
  { id: 'xp1', userId: 'u1', amount: 50, description: 'Completed React Fundamentals course', createdAt: '2025-08-20' },
  { id: 'xp2', userId: 'u1', amount: 30, description: 'Completed Portfolio Website challenge', createdAt: '2025-09-01' },
  { id: 'xp3', userId: 'u1', amount: 100, description: 'Completed Landing Page micro-internship', createdAt: '2025-09-28' },
  { id: 'xp4', userId: 'u1', amount: 20, description: 'SkillSwap session with Priya', createdAt: '2025-08-05' },
  { id: 'xp5', userId: 'u1', amount: 20, description: 'SkillSwap session with Rahul', createdAt: '2025-09-12' },
  { id: 'xp6', userId: 'u1', amount: 50, description: 'Profile completion bonus', createdAt: '2025-08-01' },
  { id: 'xp7', userId: 'u1', amount: 70, description: 'Project: E-Commerce Platform', createdAt: '2025-06-01' },
];

const payments: Payment[] = [
  { id: 'pay1', fromUserId: 'u7', toUserId: 'u1', amount: 9000, platformFee: 1000, status: 'completed', context: 'Landing Page micro-internship', createdAt: '2025-09-28' },
  { id: 'pay2', fromUserId: 'u8', toUserId: 'u3', amount: 7200, platformFee: 800, status: 'completed', context: 'Data Pipeline micro-internship', createdAt: '2025-09-25' },
  { id: 'pay3', fromUserId: 'u9', toUserId: 'u2', amount: 13500, platformFee: 1500, status: 'completed', context: 'UI/UX Audit micro-internship', createdAt: '2025-09-30' },
];

const courseEnrollments: CourseEnrollment[] = [
  { id: 'ce1', userId: 'u1', courseId: 'c1', progress: 60, completedLessons: ['l1', 'l2', 'l3'], enrolledAt: '2025-08-01' },
  { id: 'ce2', userId: 'u1', courseId: 'c2', progress: 33, completedLessons: ['l6'], enrolledAt: '2025-09-01' },
  { id: 'ce3', userId: 'u4', courseId: 'c1', progress: 100, completedLessons: ['l1', 'l2', 'l3', 'l4', 'l5'], enrolledAt: '2025-07-15' },
  { id: 'ce4', userId: 'u3', courseId: 'c3', progress: 33, completedLessons: ['l9'], enrolledAt: '2025-08-10' },
];

const challengeSubmissions: ChallengeSubmission[] = [
  { id: 'cs1', challengeId: 'ch1', userId: 'u1', submissionUrl: 'https://github.com/deepesh/portfolio', description: 'My responsive portfolio site built with HTML, CSS, and vanilla JS.', status: 'passed', feedback: 'Excellent work! Clean code and beautiful design.', submittedAt: '2025-09-01' },
  { id: 'cs2', challengeId: 'ch1', userId: 'u4', submissionUrl: 'https://github.com/ananya/portfolio', description: 'Portfolio website with dark mode and animations.', status: 'passed', feedback: 'Great implementation! Love the dark mode.', submittedAt: '2025-09-05' },
];

export const db = {
  users,
  studentProfiles,
  businessProfiles,
  courses,
  challenges,
  projects,
  microInternships,
  applications,
  skillSwaps,
  skillCreditTransactions,
  reviews,
  conversations,
  messages,
  notifications,
  certificates,
  experiencePointTransactions,
  payments,
  courseEnrollments,
  challengeSubmissions,

  getUser(id: string) { return users.find(u => u.id === id); },
  getUserByUsername(username: string) { return users.find(u => u.username === username); },
  getStudentProfile(userId: string) { return studentProfiles.find(p => p.userId === userId); },
  getBusinessProfile(userId: string) { return businessProfiles.find(p => p.userId === userId); },
  getCoursesByInstructor(instructorId: string) { return courses.filter(c => c.instructorId === instructorId); },
  getEnrollmentsByUser(userId: string) { return courseEnrollments.filter(e => e.userId === userId); },
  getApplicationsByStudent(studentId: string) { return applications.filter(a => a.studentId === studentId); },
  getApplicationsByInternship(microInternshipId: string) { return applications.filter(a => a.microInternshipId === microInternshipId); },
  getSkillSwapsByUser(userId: string) { return skillSwaps.filter(s => s.student1Id === userId || s.student2Id === userId); },
  getCreditTransactionsByUser(userId: string) { return skillCreditTransactions.filter(t => t.userId === userId); },
  getReviewsByUser(userId: string) { return reviews.filter(r => r.revieweeId === userId); },
  getConversationsByUser(userId: string) { return conversations.filter(c => c.participants.includes(userId)); },
  getMessagesByConversation(conversationId: string) { return messages.filter(m => m.conversationId === conversationId); },
  getNotificationsByUser(userId: string) { return notifications.filter(n => n.userId === userId); },
  getProjectsByUser(userId: string) { return projects.filter(p => p.userId === userId); },
  getSubmissionsByUser(userId: string) { return challengeSubmissions.filter(s => s.userId === userId); },
  getPaymentsByUser(userId: string) { return payments.filter(p => p.fromUserId === userId || p.toUserId === userId); },
  getXPByUser(userId: string) { return experiencePointTransactions.filter(t => t.userId === userId); },
  getCertificatesByUser(userId: string) { return certificates.filter(c => c.userId === userId); },

  addApplication(app: Application) { applications.push(app); return app; },
  updateApplicationStatus(id: string, status: Application['status']) {
    const app = applications.find(a => a.id === id);
    if (app) app.status = status;
    return app;
  },
  addSkillSwap(ss: SkillSwap) { skillSwaps.push(ss); return ss; },
  updateSkillSwapStatus(id: string, status: SkillSwap['status']) {
    const ss = skillSwaps.find(s => s.id === id);
    if (ss) ss.status = status;
    return ss;
  },
  addNotification(n: Notification) { notifications.push(n); return n; },
  markNotificationRead(id: string) {
    const n = notifications.find(n => n.id === id);
    if (n) n.read = true;
  },
  addMessage(m: Message) { messages.push(m); return m; },
  addProject(p: Project) { projects.push(p); return p; },
  addCourse(c: Course) { courses.push(c); return c; },
  addCreditTransaction(t: SkillCreditTransaction) { skillCreditTransactions.push(t); return t; },
  addXPTransaction(t: ExperiencePointTransaction) { experiencePointTransactions.push(t); return t; },
  addReview(r: Review) { reviews.push(r); return r; },
};
