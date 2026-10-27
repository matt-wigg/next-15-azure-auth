import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  if (!(await auth())?.user) redirect('/signin');
  return children;
}
