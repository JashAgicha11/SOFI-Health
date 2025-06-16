import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Stethoscope, Brain, Heart, Shield, Phone, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Stethoscope,
      title: 'Primary Care',
      description: 'Comprehensive healthcare services for your everyday medical needs with personalized attention.',
      color: 'blue',
    },
    {
      icon: Brain,
      title: 'Mental Health',
      description: 'Professional mental health support and therapy services for your emotional wellbeing.',
      color: 'purple',
    },
    {
      icon: Heart,
      title: 'Cardiology',
      description: 'Specialized heart care and cardiovascular health monitoring with advanced diagnostics.',
      color: 'red',
    },
    {
      icon: Shield,
      title: 'Preventive Care',
      description: 'Proactive health screenings and wellness programs to keep you healthy.',
      color: 'green',
    },
    {
      icon: Phone,
      title: 'Telemedicine',
      description: 'Virtual consultations and remote monitoring for convenient healthcare access.',
      color: 'teal',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock medical support and emergency consultation services.',
      color: 'orange',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-card', 
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Hover animations for cards
      const cards = document.querySelectorAll('.service-card');
      cards.forEach((card) => {
        const icon = card.querySelector('.service-icon');
        const content = card.querySelector('.service-content');
        
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
          gsap.to(icon, { scale: 1.2, rotation: 5, duration: 0.3, ease: 'back.out(1.7)' });
          gsap.to(content, { y: -5, duration: 0.3, ease: 'power2.out' });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: 'back.out(1.7)' });
          gsap.to(content, { y: 0, duration: 0.3, ease: 'power2.out' });
        });
      });

    }, servicesRef);

    return () => ctx.revert();
  }, []);

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-600 text-blue-600',
      purple: 'from-purple-500 to-purple-600 text-purple-600',
      red: 'from-red-500 to-red-600 text-red-600',
      green: 'from-green-500 to-green-600 text-green-600',
      teal: 'from-teal-500 to-teal-600 text-teal-600',
      orange: 'from-orange-500 to-orange-600 text-orange-600',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section ref={servicesRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Healthcare Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From routine check-ups to specialized care, we offer a full spectrum of medical services 
            designed to keep you healthy and thriving.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colorClasses = getColorClasses(service.color);
            
            return (
              <div
                key={index}
                className="service-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
              >
                <div className={`service-icon w-16 h-16 rounded-full bg-gradient-to-r ${colorClasses.split(' ').slice(0, 2).join(' ')} flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="service-content">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className={`text-sm font-semibold ${colorClasses.split(' ').slice(-1)[0]} hover:underline transition-colors duration-200`}>
                    Learn More →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;