'use client';

import { TaskForm } from '@/components/TaskForm';

export default function NewTaskPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Task</h1>
      <TaskForm />
    </div>
  );
}