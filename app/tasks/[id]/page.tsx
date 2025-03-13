'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskById } from '@/store/features/taskSlice';
import type { AppDispatch, RootState } from '@/store/store';

export default function TaskDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedTask, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    if (id) {
      dispatch(getTaskById(id as string));
    }
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!selectedTask) return <div>Task not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-card rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">{selectedTask.title}</h1>
        <p className="text-muted-foreground mb-4">{selectedTask.description}</p>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Status:</span>
          <span className="capitalize">{selectedTask.status}</span>
        </div>
      </div>
    </div>
  );
}