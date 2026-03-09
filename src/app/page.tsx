import { cookies } from 'next/headers';
import HomePageClient from '@/components/HomePageClient';
import { INVITE_ACCESS_COOKIE } from '@/lib/invite-auth';

export default async function Home() {
  const cookieStore = await cookies();
  const isVerified = cookieStore.get(INVITE_ACCESS_COOKIE)?.value === 'granted';

  return <HomePageClient isVerified={isVerified} />;
}