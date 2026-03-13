import React from 'react';
import { Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
          >
            <span className="text-white">NAVNEET</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">
              {' '}SUKHRAJ
            </span>
          </div>

          {/* Email Icon */}
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToContact}
              aria-label="Contact via Email"
              className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-gray-400 hover:text-white hover:border-red-500 hover:bg-gradient-to-br hover:from-red-600/10 hover:to-red-500/10 transition-all duration-300"
            >
              <Mail size={20} />
            </button>
          </div>

          {/* Copyright */}
          <div className="text-center pt-6 border-t border-zinc-800 w-full">
            <p className="text-gray-500 text-sm">
              © {currentYear} Navneet Sukhraj. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Crafted with passion for visual storytelling
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;