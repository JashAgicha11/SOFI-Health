import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Shield, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      if (titleRef.current && subtitleRef.current && ctaRef.current) {
        gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
          opacity: 0,
          y: 50,
        });
      }

      const floatingElements = heroRef.current?.querySelectorAll('.floating-element');
      if (floatingElements && floatingElements.length > 0) {
        gsap.set(floatingElements, {
          opacity: 0,
          scale: 0,
        });
      }

      // Main animation timeline
      const tl = gsap.timeline({ delay: 0.5 });

      if (titleRef.current) {
        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        });
      }

      if (subtitleRef.current) {
        tl.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.5');
      }

      if (ctaRef.current) {
        tl.to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.3');
      }

      if (floatingElements && floatingElements.length > 0) {
        tl.to(floatingElements, {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'back.out(1.7)',
        }, '-=0.5');

        // Floating animation for elements
        gsap.to(floatingElements, {
          y: -20,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          stagger: 0.5,
        });
      }

      // Parallax effect on scroll
      const heroBg = heroRef.current?.querySelector('.hero-bg');
      if (heroBg) {
        gsap.to(heroBg, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Background Elements */}
      <div className="hero-bg absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-teal-200 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Elements */}
      <div ref={floatingElementsRef} className="absolute inset-0">
        <div className="floating-element absolute top-1/4 left-1/4 w-16 h-16 bg-blue-500 rounded-full opacity-10"></div>
        <div className="floating-element absolute top-3/4 right-1/4 w-12 h-12 bg-teal-500 rounded-full opacity-15"></div>
        <div className="floating-element absolute top-1/2 right-1/3 w-8 h-8 bg-green-500 rounded-full opacity-20"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="flex justify-center mb-8 space-x-4">
          <div className="floating-element p-4 bg-white rounded-full shadow-xl">
            <Heart className="w-8 h-8 text-blue-600" />
          </div>
          <div className="floating-element p-4 bg-white rounded-full shadow-xl">
            <Shield className="w-8 h-8 text-teal-600" />
          </div>
          <div className="floating-element p-4 bg-white rounded-full shadow-xl">
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Your Health,
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
            Our Priority
          </span>
        </h1>

        <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Experience personalized healthcare with cutting-edge technology and compassionate care. 
          Your wellness journey starts here.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Get Started Today
          </button>
          <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-blue-600 hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;