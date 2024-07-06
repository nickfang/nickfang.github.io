'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Route {
  name: string;
  path: string;
}

const IdeasNavBar = () => {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const currentDir = segments.slice(1).join('/');
  const routes: Route[] = [
    { name: 'Date Range', path: `${currentDir}/date-range` },
    { name: 'Corners', path: `${currentDir}/styling/corners` },
    { name: 'Inset', path: `${currentDir}/inset` },
    { name: 'Toast', path: `${currentDir}/sonner-toast` },
  ];

  return (
    <nav>
      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <Link href={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Ideas = () => {
  return (
    <div>
      <h1 className="color-white">Ideas</h1>
      <IdeasNavBar />
    </div>
  );
};

export default Ideas;
