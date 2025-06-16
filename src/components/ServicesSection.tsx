import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useInView } from 'framer-motion';
import { Brain, Heart, Shield, Zap } from 'lucide-react';
import * as THREE from 'three';

const FloatingCube: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.7}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const ServicesSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Brain,
      title: "AI Diagnostics",
      description: "Advanced machine learning algorithms analyze your symptoms and medical history to provide accurate diagnoses in seconds.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Heart,
      title: "Personalized Treatment",
      description: "Tailored treatment plans based on your genetic profile, lifestyle, and real-time health data.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Preventive Care",
      description: "Proactive health monitoring that identifies potential issues before they become serious problems.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Real-time Monitoring",
      description: "Continuous health tracking through wearable devices and smart sensors for immediate insights.",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="services" ref={ref} className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <FloatingCube position={[-4, 2, -2]} color="#3b82f6" />
          <FloatingCube position={[4, -1, -1]} color="#8b5cf6" />
          <FloatingCube position={[0, 3, -3]} color="#10b981" />
          <FloatingCube position={[-2, -2, -2]} color="#f59e0b" />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Revolutionary Healthcare Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of medicine with our AI-powered healthcare platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-6`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-300 leading-relaxed">{service.description}</p>
              
              <motion.button
                className="mt-6 text-blue-400 font-semibold hover:text-blue-300 transition-colors"
                whileHover={{ x: 5 }}
              >
                Learn More →
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;