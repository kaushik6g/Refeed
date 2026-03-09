'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { taskSchema } from '@/lib/validations/task';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '@/store/features/taskSlice';
import type { AppDispatch } from '@/store/store';
import type { Task } from '@/store/features/taskSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

type TaskFormData = {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
};

interface TaskFormProps {
  task?: Task;
  isEdit?: boolean;
}

export function TaskForm({ task, isEdit = false }: TaskFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      status: task?.status || 'pending',
    },
  });

  const onSubmit = async (data: TaskFormData) => {
    try {
      if (isEdit && task) {
        await dispatch(updateTask({ id: task.id, taskData: data })).unwrap();
        toast({
          title: 'Success!',
          description: 'Task updated successfully.',
        });
        router.push(`/tasks/${task.id}`);
      } else {
        await dispatch(addTask(data)).unwrap();
        toast({
          title: 'Success!',
          description: 'Task created successfully.',
        });
        router.push('/');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${isEdit ? 'update' : 'create'} task. Please try again.`,
        variant: 'destructive',
      });
      console.error('Failed to save task:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit Task' : 'Create New Task'}</CardTitle>
        <CardDescription>
          {isEdit ? 'Update the task details below.' : 'Fill in the details to create a new task.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              {...register('title')}
              id="title"
              placeholder="Enter task title..."
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-destructive text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              {...register('description')}
              id="description"
              rows={5}
              placeholder="Enter task description..."
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-destructive text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              defaultValue={task?.status || 'pending'}
              onValueChange={(value) => setValue('status', value as TaskFormData['status'])}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-destructive text-sm">{errors.status.message}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? 'Update Task' : 'Create Task'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}