import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Heart } from 'lucide-react';

interface LoadingAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ isVisible, onComplete }) => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !loadingRef.current) return;

    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(loadingRef.current, { opacity: 1 });
      
      if (progressRef.current) {
        gsap.set(progressRef.current, { scaleX: 0 });
      }
      
      if (logoRef.current) {
        gsap.set(logoRef.current, { scale: 0.8, opacity: 0 });
      }

      // Check if loading dots exist before animating
      const loadingDots = loadingRef.current?.querySelectorAll('.loading-dot');
      if (loadingDots && loadingDots.length > 0) {
        gsap.set(loadingDots, { scale: 0, opacity: 0 });
      }

      // Logo animation
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'back.out(1.7)',
          delay: 0.5,
        });

        // Floating animation for logo
        gsap.to(logoRef.current, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: 1.5,
        });
      }

      // Progress bar animation
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          duration: 3,
          ease: 'power2.out',
          delay: 1,
        });
      }

      // Loading dots animation
      if (loadingDots && loadingDots.length > 0) {
        gsap.to(loadingDots, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: 1.5,
        });
      }

      // Complete animation and fade out
      gsap.to(loadingRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        delay: 4,
        onComplete: onComplete,
      });

    }, loadingRef);

    return () => ctx.revert();
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 z-50 bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center"
    >
      <div className="text-center">
        {/* Logo */}
        <div ref={logoRef} className="mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            SOFI<span className="text-blue-600">Health</span>
          </h1>
          <p className="text-gray-600 mt-2">Your wellness journey starts here</p>
        </div>

        {/* Loading Animation */}
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-blue-600 to-teal-600 rounded-full origin-left"
            ></div>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="loading-dot w-3 h-3 bg-blue-600 rounded-full"
              ></div>
            ))}
          </div>

          <p className="text-gray-500 text-sm">Loading your healthcare experience...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;