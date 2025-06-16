import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/JashAgicha11', label: 'GitHub' },
    { icon: Twitter, href: 'https://jashagicha.netlify.app/', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/jashagicha11', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/jassh._.11/', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <motion.div
              className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4"
              whileHover={{ scale: 1.05 }}
            >
              SOFI Health
            </motion.div>
            <p className="text-gray-400 mb-6 max-w-md">
              Revolutionizing healthcare through AI-powered diagnostics and personalized treatment plans. 
              Your health, reimagined.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">AI Diagnostics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Personalized Treatment</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Preventive Care</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Real-time Monitoring</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Jash Agicha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;