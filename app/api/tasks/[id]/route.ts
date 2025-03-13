import { NextResponse } from 'next/server';

let tasks = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the project',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const task = tasks.find((t) => t.id === params.id);
  if (!task) {
    return new NextResponse('Task not found', { status: 404 });
  }
  return NextResponse.json(task);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const index = tasks.findIndex((t) => t.id === params.id);
  if (index === -1) {
    return new NextResponse('Task not found', { status: 404 });
  }
  tasks[index] = {
    ...tasks[index],
    ...body,
    updatedAt: new Date().toISOString(),
  };
  return NextResponse.json(tasks[index]);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = tasks.findIndex((t) => t.id === params.id);
  if (index === -1) {
    return new NextResponse('Task not found', { status: 404 });
  }
  tasks = tasks.filter((t) => t.id !== params.id);
  return new NextResponse(null, { status: 204 });
}