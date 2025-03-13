'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { taskSchema } from '@/lib/validations/task';
import { useDispatch } from 'react-redux';
import { addTask } from '@/store/features/taskSlice';
import type { AppDispatch } from '@/store/store';

type TaskFormData = {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
};

export function TaskForm() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: yupResolver(taskSchema),
  });

  const onSubmit = async (data: TaskFormData) => {
    try {
      await dispatch(addTask(data)).unwrap();
      // Handle success (e.g., redirect or show success message)
    } catch (error) {
      // Handle error
      console.error('Failed to create task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title
        </label>
        <input
          {...register('title')}
          id="title"
          type="text"
          className="w-full rounded-md border border-input px-3 py-2"
        />
        {errors.title && (
          <p className="text-destructive text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          {...register('description')}
          id="description"
          rows={4}
          className="w-full rounded-md border border-input px-3 py-2"
        />
        {errors.description && (
          <p className="text-destructive text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium mb-2">
          Status
        </label>
        <select
          {...register('status')}
          id="status"
          className="w-full rounded-md border border-input px-3 py-2"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        {errors.status && (
          <p className="text-destructive text-sm mt-1">{errors.status.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
      >
        Create Task
      </button>
    </form>
  );
}