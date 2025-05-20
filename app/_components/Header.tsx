"use client"
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'

const Header = () => {
  return (
    <header className="pt-5">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="md:flex md:items-center md:gap-12">
        <a className="block text-teal-600" href="#">
          <span className="sr-only">Home</span>
          <img src="logo.png" alt="logo" width={120}/>
        </a>
      </div>

      <div className="hidden md:block">
        <nav aria-label="Global">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <a className="text-gray-500 transition hover:text-cyan-600/75" href="/"> Home </a>
            </li>

            <li>
              <a className="text-gray-500 transition hover:text-cyan-600/75" href="/dashboard"> Canvas </a>
            </li>

            <li>
              <a className="text-gray-500 transition hover:text-cyan-600/75" href="/dashboard"> Pricing </a>
            </li>

            <li>
              <a className="text-gray-500 transition hover:text-cyan-600/75" href="#"> Contact Us </a>
            </li>

            
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">
          <a
            className="rounded-md bg-cyan-600 border border-cyan-700  hover:bg-cyan-500 hover:text-black px-5 py-2.5 text-sm font-medium text-white shadow-sm"
            // href="#"
          >
            <LoginLink postLoginRedirectURL="/dashboard">
            Login
            </LoginLink>
          </a>

          <div className="hidden sm:flex">
            <a
              className="rounded-md bg-gray-200 hover:bg-gray-100 border border-gray-300 px-5 py-2.5 text-sm font-medium text-cyan-600"
              // href="#"
            >
              <RegisterLink postLoginRedirectURL="/dashboard">
              Register
              </RegisterLink>
            </a>
          </div>
        </div>

        {/* <div className="block md:hidden">
          <button
            className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div> */}
      </div>
    </div>
  </div>
</header>
  )
}

export default Header