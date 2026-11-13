// Meilisearch Integration
// Free, open-source search engine
// To use:
// 1. Install Meilisearch: curl -L https://install.meilisearch.com | sh
// 2. Run: ./meilisearch
// 3. Set MEILISEARCH_HOST and MEILISEARCH_API_KEY in .env.local
// 4. Install client: npm install meilisearch

export const MEILISEARCH_HOST = process.env.MEILISEARCH_HOST || 'http://localhost:7700';
export const MEILISEARCH_API_KEY = process.env.MEILISEARCH_API_KEY || '';

// Index names
export const INDEXES = {
  USERS: 'users',
  COURSES: 'courses',
  PROJECTS: 'projects',
  SKILLS: 'skills',
  MICRO_INTERNSHIPS: 'micro_internships',
} as const;

// Search result types
export interface SearchResult {
  id: string;
  type: 'user' | 'course' | 'project' | 'skill' | 'internship';
  title: string;
  description: string;
  url: string;
  highlights?: string[];
}

// Demo search implementation (works without Meilisearch)
export function demoSearch(query: string, data: unknown[]): unknown[] {
  const q = query.toLowerCase();
  return data.filter(item => {
    const searchText = JSON.stringify(item).toLowerCase();
    return searchText.includes(q);
  });
}

/*
// Real Meilisearch integration (requires running Meilisearch instance)
import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({
  host: MEILISEARCH_HOST,
  apiKey: MEILISEARCH_API_KEY,
});

export async function indexUsers(users: any[]) {
  const index = client.index(INDEXES.USERS);
  await index.addDocuments(users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    username: u.username,
    headline: u.headline || '',
    bio: u.bio || '',
    location: u.location || '',
    role: u.role,
    type: 'user',
  })));
}

export async function indexCourses(courses: any[]) {
  const index = client.index(INDEXES.COURSES);
  await index.addDocuments(courses.map(c => ({
    id: c.id,
    title: c.title,
    description: c.description,
    category: c.category,
    difficulty: c.difficulty,
    skills: c.skills?.map((s: any) => s.skillName) || [],
    rating: c.rating,
    price: c.price,
    instructor: c.instructor?.name || '',
    type: 'course',
  })));
}

export async function indexProjects(projects: any[]) {
  const index = client.index(INDEXES.PROJECTS);
  await index.addDocuments(projects.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    skills: p.skills?.map((s: any) => s.skillName) || [],
    role: p.role,
    userId: p.userId,
    type: 'project',
  })));
}

export async function globalSearch(query: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];

  const userResults = await client.index(INDEXES.USERS).search(query, { limit: 5 });
  userResults.hits.forEach((hit: any) => {
    results.push({ id: hit.id, type: 'user', title: hit.name, description: hit.headline || '', url: `/u/${hit.username}` });
  });

  const courseResults = await client.index(INDEXES.COURSES).search(query, { limit: 5 });
  courseResults.hits.forEach((hit: any) => {
    results.push({ id: hit.id, type: 'course', title: hit.title, description: hit.description, url: `/courses/${hit.id}` });
  });

  const projectResults = await client.index(INDEXES.PROJECTS).search(query, { limit: 5 });
  projectResults.hits.forEach((hit: any) => {
    results.push({ id: hit.id, type: 'project', title: hit.title, description: hit.description, url: '/projects' });
  });

  return results;
}

export async function setupSearchIndexes() {
  // Create indexes with searchable attributes
  await client.index(INDEXES.USERS).updateSettings({
    searchableAttributes: ['name', 'email', 'username', 'headline', 'bio', 'location'],
    displayedAttributes: ['id', 'name', 'email', 'username', 'headline', 'bio', 'location', 'role'],
  });

  await client.index(INDEXES.COURSES).updateSettings({
    searchableAttributes: ['title', 'description', 'category', 'skills', 'instructor'],
    displayedAttributes: ['id', 'title', 'description', 'category', 'difficulty', 'skills', 'rating', 'price', 'instructor'],
    filterableAttributes: ['category', 'difficulty', 'price'],
  });

  await client.index(INDEXES.PROJECTS).updateSettings({
    searchableAttributes: ['title', 'description', 'skills', 'role'],
    displayedAttributes: ['id', 'title', 'description', 'skills', 'role', 'userId'],
  });
}
*/
