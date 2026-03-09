'use client';

import { TaskForm } from '@/components/TaskForm';

export default function NewTaskPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <TaskForm />
    </div>
  );
}