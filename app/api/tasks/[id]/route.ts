import { NextResponse } from 'next/server';
import { getTasks, setTasks } from '../route';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === params.id);
  
  if (!task) {
    return NextResponse.json(
      { error: 'Task not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(task);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex((t) => t.id === params.id);
  
  if (taskIndex === -1) {
    return NextResponse.json(
      { error: 'Task not found' },
      { status: 404 }
    );
  }
  
  const body = await request.json();
  const updatedTask = {
    ...tasks[taskIndex],
    ...body,
    updatedAt: new Date().toISOString(),
  };
  
  tasks[taskIndex] = updatedTask;
  setTasks(tasks);
  
  return NextResponse.json(updatedTask);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tasks = getTasks();
  const filteredTasks = tasks.filter((t) => t.id !== params.id);
  
  if (tasks.length === filteredTasks.length) {
    return NextResponse.json(
      { error: 'Task not found' },
      { status: 404 }
    );
  }
  
  setTasks(filteredTasks);
  
  return NextResponse.json({ success: true });
}