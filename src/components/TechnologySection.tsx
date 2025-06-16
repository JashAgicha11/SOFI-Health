import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';

const NetworkNodes: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => {
    const nodePositions = [];
    for (let i = 0; i < 50; i++) {
      nodePositions.push([
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      ]);
    }
    return nodePositions;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((position, index) => (
        <mesh key={index} position={position as [number, number, number]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      
      {/* Connection lines */}
      {nodes.slice(0, 20).map((start, index) => {
        const end = nodes[(index + 1) % nodes.length];
        const points = [
          new THREE.Vector3(start[0], start[1], start[2]),
          new THREE.Vector3(end[0], end[1], end[2])
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        return (
          <line key={`line-${index}`} geometry={geometry}>
            <lineBasicMaterial color="#3b82f6" opacity={0.3} transparent />
          </line>
        );
      })}
    </group>
  );
};

const TechnologySection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const technologies = [
    {
      title: "Machine Learning",
      description: "Advanced neural networks that learn from millions of medical cases",
      percentage: 95
    },
    {
      title: "Computer Vision",
      description: "AI-powered image analysis for medical imaging and diagnostics",
      percentage: 88
    },
    {
      title: "Natural Language Processing",
      description: "Understanding and processing medical literature and patient data",
      percentage: 92
    },
    {
      title: "Predictive Analytics",
      description: "Forecasting health trends and potential medical issues",
      percentage: 87
    }
  ];

  return (
    <section id="technology" ref={ref} className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="h-96 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
          >
            <Canvas camera={{ position: [0, 0, 10] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <NetworkNodes />
            </Canvas>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Cutting-Edge Technology
            </h2>
            
            <p className="text-lg text-gray-300 mb-12">
              Our platform leverages the latest advances in artificial intelligence 
              and machine learning to deliver unprecedented healthcare insights.
            </p>

            <div className="space-y-8">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-white">{tech.title}</h3>
                    <span className="text-blue-400 font-bold">{tech.percentage}%</span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3">{tech.description}</p>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${tech.percentage}%` } : {}}
                      transition={{ duration: 1.5, delay: 0.8 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;