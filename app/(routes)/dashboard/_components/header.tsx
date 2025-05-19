import { Button } from '@/components/ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Search, Send, Share, Share2 } from 'lucide-react'
import Image from 'next/image'
import React, { use } from 'react'

const Header = () => {
    const {user}:any=useKindeBrowserClient();
  return (
    <div className='flex gap-4 items-center'>
        <div className='flex gap-2 items-center border border-gray-300 px-2 py-1 rounded-md'>
            <Search className='w-4 h-4 rounded-full' />
            <input type="text" placeholder='Search' className='bg-transparent outline-none  rounded-md px-2 py-1 text-sm placeholder:text-gray-400' />
        </div>
        <div className=''>
            <Image src={user?.picture} alt="avatar" width={25} height={25} className=' rounded-full' />
        </div>
        <Button className='bg-cyan-700 hover:bg-cyan-800'><Send/>Invite</Button>
    </div>
  )
}

export default Header