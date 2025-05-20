"use client";

import { Button } from '@/components/ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Send, Share } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useDashboardData } from '@/contexts/ActiveTeamContext';
import { toast } from 'sonner';

const Header = () => {
  const { user }: any = useKindeBrowserClient();
  const [emailInput, setEmailInput] = useState("");
  const addMembers = useMutation(api.teams.addMembers);
const {activeTeam}:any = useDashboardData();
  const teamId = activeTeam?._id;
  const handleInvite = async () => {
    const emails = emailInput
      .split(",")
      .map(email => email.trim())
      .filter(email => email.length > 0);

    if (emails.length === 0) return;

    try {
      await addMembers({
        id: teamId,
        members: emails,
      });
      setEmailInput(""); // Clear input
      toast.success("Invites sent!");
    } catch (err) {
      console.error("Error inviting members:", err);
      toast.error("Failed to send invites.");
    }
  };

  return (
    <div className='flex gap-4 items-center'>

      {/* User Avatar */}
      <div>
        <Image
          src={user?.picture}
          alt="avatar"
          width={25}
          height={25}
          className='rounded-full'
        />
      </div>

      {/* Invite Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className='bg-cyan-700 hover:bg-cyan-800'>
            <Send className="mr-2" />
            Invite
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Your Colleagues!</DialogTitle>
            <DialogDescription>
              Enter email(s) of the person you want to invite. They will be added to your team.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="emails" className="sr-only">Emails</Label>
              <Input
                id="emails"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder='Enter email address(es), separated by comma'
              />
            </div>
            <Button
              size="sm"
              className="px-3 bg-cyan-600 hover:bg-cyan-700"
              onClick={handleInvite}
            >
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
  );
};

export default Header;
