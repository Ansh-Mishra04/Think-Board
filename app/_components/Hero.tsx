import React from 'react'

const Hero = () => {
  return (
    <div><section className=" lg:grid lg:h-screen lg:place-content-center">
  <div
    className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32"
  >
    <div className="max-w-prose text-left">
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
       Your infinite whiteboard for 
        <strong className="text-cyan-600"> visual thinking, </strong>
        planning, and real-time collaboration.
      </h1>

      <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
       Lightweight, open, and built for engineers, designers, and product thinkers.
      </p>

      <div className="mt-4 flex gap-4 sm:mt-6">
        <a
          className="inline-block rounded border border-cyan-600 bg-cyan-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-cyan-700"
          href="/dashboard"
        >
          Start Drawing
        </a>

        <a
          className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
    
    <img src="hero.png" alt="hero"className='overflow-hidden' />
  </div>
</section></div>
  )
}

export default Hero