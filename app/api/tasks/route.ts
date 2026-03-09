import { NextResponse } from 'next/server';

// In-memory data store (would be a database in production)
export let tasks = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the project',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Review pull requests',
    description: 'Review and merge pending pull requests from the team',
    status: 'in-progress',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Update dependencies',
    description: 'Update all npm packages to their latest versions',
    status: 'completed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function getTasks() {
  return tasks;
}

export function setTasks(newTasks: typeof tasks) {
  tasks = newTasks;
}

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTask = {
    id: Math.random().toString(36).substr(2, 9),
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}