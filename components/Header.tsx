'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CheckSquare, Home, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <CheckSquare className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl hidden sm:inline">TaskFlow</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Button
              asChild
              variant={isActive('/') ? 'default' : 'ghost'}
              size="sm"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </Button>
            <Button
              asChild
              variant={isActive('/tasks/new') ? 'default' : 'ghost'}
              size="sm"
            >
              <Link href="/tasks/new">
                <Plus className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">New Task</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
