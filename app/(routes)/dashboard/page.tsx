'use client';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex, useMutation } from 'convex/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FileList from './_components/fileList';
import Header from './_components/header';
import { useDashboardData } from '@/contexts/ActiveTeamContext';
import { api } from '@/convex/_generated/api';

const Dashboard = () => {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  const route = useRouter();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) checkUser();
  }, [user]);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    if (!result) {
      await createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture,
      });
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <Header />
      </div>
      <div className="mt-5 p-5">
        <FileList /> {/* ✅ Context-based, no need to pass props */}
      </div>
    </div>
  );
};

export default Dashboard;
