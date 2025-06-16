import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';

const DNAHelix: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  const helixPoints = [];
  for (let i = 0; i < 100; i++) {
    const angle = (i / 100) * Math.PI * 8;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    const y = (i / 100) * 10 - 5;
    helixPoints.push([x, y, z]);
  }

  return (
    <group ref={groupRef}>
      {helixPoints.map((point, index) => (
        <mesh key={index} position={point as [number, number, number]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#3b82f6" : "#8b5cf6"}
            emissive={index % 2 === 0 ? "#3b82f6" : "#8b5cf6"}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

const AboutSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Pioneering the Future of Medicine
            </h2>
            
            <div className="space-y-6 text-lg text-gray-300">
              <p>
                At SOFI Health, we're not just treating symptoms – we're revolutionizing 
                how healthcare is delivered through cutting-edge artificial intelligence 
                and personalized medicine.
              </p>
              
              <p>
                Our platform combines advanced machine learning algorithms with comprehensive 
                health data to provide unprecedented insights into your health, enabling 
                proactive care that prevents illness before it starts.
              </p>
              
              <p>
                From genomic analysis to real-time health monitoring, we're building 
                the infrastructure for a healthier tomorrow, today.
              </p>
            </div>

            <motion.div
              className="mt-12 grid grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">99.7%</div>
                <div className="text-sm text-gray-400">Diagnostic Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">50M+</div>
                <div className="text-sm text-gray-400">Data Points Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">24/7</div>
                <div className="text-sm text-gray-400">AI Monitoring</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="h-96 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Canvas camera={{ position: [0, 0, 8] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <DNAHelix />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;