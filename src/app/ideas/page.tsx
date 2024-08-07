'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getRoutes } from './routes';

const IdeasNavBar = () => {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const currentDir = segments.slice(1).join('/');
  const routes = getRoutes(currentDir);

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
      <h1 className="mb-12 text-left color-white">Ideas</h1>
      <IdeasNavBar />
    </div>
  );
};

export default Ideas;
