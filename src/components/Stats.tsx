import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Stats: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);

  const stats = [
    { number: 50000, suffix: '+', label: 'Patients Served', description: 'Trusted by thousands' },
    { number: 98, suffix: '%', label: 'Satisfaction Rate', description: 'Exceptional care quality' },
    { number: 24, suffix: '/7', label: 'Available Support', description: 'Round-the-clock care' },
    { number: 15, suffix: '+', label: 'Years Experience', description: 'Proven expertise' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the background
      gsap.fromTo('.stats-bg', 
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate stat cards
      gsap.fromTo('.stat-card', 
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: numbersRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Counter animation
      stats.forEach((stat, index) => {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: stat.number,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            const element = document.getElementById(`counter-${index}`);
            if (element) {
              element.textContent = Math.round(counter.value).toLocaleString();
            }
          },
          scrollTrigger: {
            trigger: `.stat-card-${index}`,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });

    }, statsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={statsRef} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="stats-bg absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-repeat" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }}>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted Healthcare Provider
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Our commitment to excellence in healthcare is reflected in these meaningful numbers 
            that represent our dedication to your wellbeing.
          </p>
        </div>

        <div ref={numbersRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stat-card stat-card-${index} text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300`}
            >
              <div className="mb-4">
                <span className="text-4xl md:text-5xl font-bold text-white">
                  <span id={`counter-${index}`}>0</span>
                  <span className="text-blue-200">{stat.suffix}</span>
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">
                {stat.label}
              </h3>
              
              <p className="text-blue-100 text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;