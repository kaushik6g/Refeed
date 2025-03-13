'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '@/store/features/taskSlice';
import Link from 'next/link';
import type { AppDispatch, RootState } from '@/store/store';
import { Plus } from 'lucide-react';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Link
          href="/tasks/new"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Task
        </Link>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Link
            key={task.id}
            href={`/tasks/${task.id}`}
            className="block bg-card hover:bg-card/90 rounded-lg p-4 shadow transition-colors"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <span className="px-2 py-1 text-sm rounded-full bg-primary/10 capitalize">
                {task.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}