import { Button } from '@/components/ui/button';
import { Crown, Zap } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useDashboardData } from '@/contexts/ActiveTeamContext'; // Import the context hook
import Constant from '@/app/_constants/Constant';

const MiddleSidebar = () => {
  const { activeTeam, files, loading, refreshData } = useDashboardData(); // Use the context

  const [progress, setProgress] = useState(0);
  const [progressbar, setProgressbar] = useState(0);

  useEffect(() => {
    if (files) {
      const totalFiles = files.length;
      setProgress(totalFiles);
      setProgressbar((totalFiles / Constant.MAX_FREE_COUNTS) * 100); // Calculate the percentage based on 10 files
    }
  }, [files]);

  if (loading) return <div><div id="dropdown-cta" className="p-4 mt-6 rounded-lg bg-gray-200" role="alert" aria-busy="true">
  <div className="flex items-center mb-3">
    <span className="bg-gray-300 text-transparent text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm flex gap-2 animate-pulse">
      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
      <div className="w-12 h-4 bg-gray-300 rounded"></div>
    </span>
  </div>
  <p className="mb-3 text-sm text-gray-300 animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
  </p>
  <a className="text-sm text-gray-300 underline font-medium animate-pulse" href="#">
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  </a>
  <div className="h-3 w-full bg-gray-300 rounded-full mt-5">
    <div className="h-3 bg-gray-400 rounded-full" ></div>
  </div>
  <p className="text-sm ml-1 text-gray-300 my-2 animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
  </p>
  <button className="w-full bg-gray-300 rounded h-10 animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
  </button>
</div></div>;

  if (!activeTeam) {
    return <div className="p-4 text-sm text-gray-600">No team selected.</div>;
  }

  // Set the progress color based on the number of files used
  const progressColorClass =
    progress > 6 ? 'bg-red-600' : progress > 3 ? 'bg-yellow-600' : 'bg-cyan-600';

  return (
    <div
      id="dropdown-cta"
      className="p-4 mt-6 rounded-lg bg-cyan-50 dark:bg-white"
      role="alert"
    >
      <div className="flex items-center mb-3">
        <span className="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm flex gap-2">
          <Zap />
          Free
        </span>
      </div>
      <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
        You've used <b>{progress} of ${Constant.MAX_FREE_COUNTS}</b> free files. Upgrade to unlock unlimited files and more!
      </p>
      <a
        className="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
        href="#"
      >
        See Our Affordable Plans
      </a>
      <div className="h-3 w-full bg-gray-300 rounded-full mt-5">
        <div className={`h-3 ${progressColorClass} rounded-full`} style={{ width: `${progressbar}%` }}></div>
      </div>
      <p className="text-sm ml-1 text-gray-500 my-2">
        <b>{progress}</b> out of <b>{Constant.MAX_FREE_COUNTS}</b> free files used
      </p>
      <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
        Upgrade to Pro <Crown />
      </Button>
    </div>
  );
};

export default MiddleSidebar;
