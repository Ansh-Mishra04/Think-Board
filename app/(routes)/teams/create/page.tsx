"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import {useRouter } from "next/navigation";
const createTeam = () => {

  const [teamName,setTeamName] = useState('');
  const createTeam=useMutation(api.teams.createTeam);
  const {user}:any = useKindeBrowserClient();
  const router =useRouter();
  useEffect(()=>{
    if(!user){
      console.log("User is not logged in");
      
    }
    else{
      console.log(user);
    }
  },[user])
  const createNewTeam = async ()=>{
    console.log(user, teamName);
    
    user && createTeam({
      name:teamName,
      members:[user?.email],
      createdBy:user?.email
    }).then((res)=>{
      console.log(res);
      if(res){
        router.push('/dashboard');
        toast.success("Team Created Successfully")
      }
    })
  }


  return (
    <>
      <div className="flex flex-col items-center bg-[#73a9cf] min-h-screen p-24">
        <div className="flex flex-col items-center bg-gray-200 rounded-2xl h-[600px] w-[50%] p-2">
          <a href={process.env.LIVE_URL}>
          <Image
            src="/logo.png"
            alt="team"
            width={150}
            height={150}
            className=""
          />
          </a>
          <h1 className="text-2xl font-bold text-gray-600 sm:text-3xl mt-10">
            Let’s Name Your Playground
          </h1>
          <p className="text-sm mt-3 text-gray-700">
            This is your space to sketch, dream, and build — call it whatever
            you like!
          </p>
          <div className="relative rounded-full overflow-hidden bg-white shadow-xl w-100  mt-24 items-center">
            <input
              className="input bg-cyan-50 outline-none border-none pl-6 pr-10 py-5 w-full font-sans text-lg font-semibold"
              placeholder="What’s the Team name?"
              name="text"
              type="text"
              onChange={(e) => setTeamName(e.target.value)}
            />
            <div className="absolute right-2 top-[0.4em]">
              <button onClick={createNewTeam} className="w-14 h-14 rounded-full bg-cyan-500 group shadow-xl flex items-center justify-center relative overflow-hidden">
                <svg
                  className="relative z-10"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 64 64"
                  height="50"
                  width="50"
                >
                  <path
                    fill-opacity="0.01"
                    fill="white"
                    d="M63.6689 29.0491L34.6198 63.6685L0.00043872 34.6194L29.0496 1.67708e-05L63.6689 29.0491Z"
                  ></path>
                  <path
                    stroke-linejoin="round"
                    strokeLinecap="round"
                    stroke-width="3.76603"
                    stroke="white"
                    d="M42.8496 18.7067L21.0628 44.6712"
                  ></path>
                  <path
                    stroke-linejoin="round"
                    strokeLinecap="round"
                    stroke-width="3.76603"
                    stroke="white"
                    d="M26.9329 20.0992L42.85 18.7067L44.2426 34.6238"
                  ></path>
                </svg>
                <div className="w-full h-full rotate-45 absolute left-[32%] top-[32%] bg-black group-hover:-left-[100%] group-hover:-top-[100%] duration-1000"></div>
                <div className="w-full h-full -rotate-45 absolute -left-[32%] -top-[32%] group-hover:left-[100%] group-hover:top-[100%] bg-black duration-1000"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default createTeam;
