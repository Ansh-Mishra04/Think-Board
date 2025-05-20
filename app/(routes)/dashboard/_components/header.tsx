import { Button } from '@/components/ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Copy, Search, Send, Share, Share2 } from 'lucide-react'
import Image from 'next/image'
import React, { use } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"

import { Input } from '@/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
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

        <Dialog>
  <DialogTrigger>
    <Button className='bg-cyan-700 hover:bg-cyan-800'
        onClick={()=>{}}
        ><Send/>Invite</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Invite Your Colleagues!</DialogTitle>
      <DialogDescription>
        Enter email of the person you want to invite, and they can see the team on their dashboard.
      </DialogDescription>
    </DialogHeader>
    <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              placeholder='Enter email address (separated by comma)'
/>
          </div>
          <Button size="sm" className="px-3 bg-cyan-600 hover:bg-cyan-700 cursor-pointer">
            <span className="sr-only">Invite</span>
            <Share className="w-4 h-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
  </DialogContent>
</Dialog>

        
    </div>
  )
}

export default Header