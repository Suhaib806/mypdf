import React from 'react'

const Hero = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className='inline-flex gap-3 items-center mb-5 bg-white p-2 rounded-full mx-auto'>
            <span className='bg-lime-300 rounded-full px-3 py-0.5 text-sm font-medium'>New</span>
            <p className="text-sm text-gray-700">The Essential Productivity Tool</p>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[72px] leading-tight sm:leading-tight font-bold text-black ">
            Easy task management for your remote team
          </h1>

          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Streamline your workflow, manage projects, and empower your team with TaskHub the all-in-one task management solution.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 sm:mt-8">
            <a
              className="inline-block rounded-full border border-[#ffd86f] bg-[#ffd86f] px-5 py-3 text-base font-medium text-black shadow-sm transition-colors hover:border-[#5cacb3] hover:text-white hover:bg-[#5cacb3]"
              href="#"
            >
              Book A Demo
            </a>

            <a
              className="inline-block rounded-full bg-white px-5 py-3 text-base font-medium text-black transition-colors hover:bg-black hover:text-white"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
