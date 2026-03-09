'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTask } from '@/store/features/taskSlice';
import Link from 'next/link';
import type { AppDispatch, RootState } from '@/store/store';
import { Plus, CheckCircle2, Clock, AlertCircle, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleStatusChange = async (taskId: string, newStatus: 'pending' | 'in-progress' | 'completed', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await dispatch(updateTask({ id: taskId, taskData: { status: newStatus } })).unwrap();
      toast({
        title: 'Status updated!',
        description: `Task status changed to ${newStatus.replace('-', ' ')}.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update task status.',
        variant: 'destructive',
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'in-progress':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
    }
  };

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Error Loading Tasks</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Task Management</h1>
            <p className="text-muted-foreground mt-1">Manage your tasks efficiently</p>
          </div>
          <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
            <Link href="/tasks/new">
              <Plus className="mr-2 h-5 w-5" />
              New Task
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Tasks</CardDescription>
              <CardTitle className="text-3xl">{taskStats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                Pending
              </CardDescription>
              <CardTitle className="text-3xl text-yellow-500">{taskStats.pending}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                In Progress
              </CardDescription>
              <CardTitle className="text-3xl text-blue-500">{taskStats.inProgress}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                Completed
              </CardDescription>
              <CardTitle className="text-3xl text-green-500">{taskStats.completed}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">All Tasks</h2>
          {tasks.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground text-lg mb-4">No tasks yet</p>
                <Button asChild>
                  <Link href="/tasks/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create your first task
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.01] group">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <Link href={`/tasks/${task.id}`} className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="mt-1">
                          {getStatusIcon(task.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl mb-2 truncate group-hover:text-primary transition-colors">
                            {task.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {task.description}
                          </CardDescription>
                        </div>
                      </Link>
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <Badge className={getStatusColor(task.status)}>
                                {task.status.replace('-', ' ')}
                              </Badge>
                              <MoreVertical className="ml-1 h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={(e) => handleStatusChange(task.id, 'pending', e)}
                              className="cursor-pointer"
                            >
                              <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                              Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => handleStatusChange(task.id, 'in-progress', e)}
                              className="cursor-pointer"
                            >
                              <Clock className="mr-2 h-4 w-4 text-blue-500" />
                              In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => handleStatusChange(task.id, 'completed', e)}
                              className="cursor-pointer"
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                              Completed
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}