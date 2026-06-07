import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Users,
  LayoutDashboard,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { to: '/', icon: Home, label: '首页' },
  { to: '/courses', icon: BookOpen, label: '课程' },
  { to: '/community', icon: Users, label: '社区' },
  { to: '/dashboard', icon: LayoutDashboard, label: '仪表盘' },
  { to: '/profile', icon: User, label: '我的' },
];

export default function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[var(--z-fixed)] md:hidden glass-navbar border-t border-white/10 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-14 px-2">
        {tabs.map((tab) => {
          const active = isActive(tab.to);
          return (
            <button
              key={tab.to}
              onClick={() => navigate(tab.to)}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 w-16 h-full relative transition-all duration-200',
                active ? 'text-accent' : 'text-gray-500 hover:text-gray-300'
              )}
            >
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full" />
              )}
              <tab.icon
                className={cn(
                  'w-5 h-5 transition-transform duration-200',
                  active && 'scale-110'
                )}
              />
              <span className="text-[10px] font-medium leading-none">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
