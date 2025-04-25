import React from 'react';

const VideoSection = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Optional: Add a heading for the video section */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold text-black sm:text-4xl">
            See It In Action
          </h2>
          <p className="mt-4 text-gray-600">
            Watch a quick overview of how our platform can streamline your workflow.
          </p>
        </div>

        {/* Video Placeholder replaced with actual video element */}
        <div className="mx-auto max-w-4xl">
          {/* Replace the div below with the video tag */}
          {/* 
          <div className="aspect-video w-full bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
            <span className="text-gray-500 text-lg font-medium">
              Video Placeholder (16:9)
            </span>
          </div> 
          */}
          <video
            className="aspect-video w-full rounded-lg shadow-lg"
            src="/video.webm" // Assumes video.webm is in /public folder
            controls // Show default video controls
            loop // Loop the video
            muted // Mute by default (required for autoplay)
            playsInline // Important for iOS playback
            autoPlay // Add autoplay attribute
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default VideoSection; 