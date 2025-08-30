import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function SocialLinks() {
  return (
    <div className="flex justify-center space-x-4">
      <a
        href="#"
        className="bg-green-100/30 hover:bg-green-200/50 p-3 rounded-2xl transition-colors"
      >
        <Facebook className="w-6 h-6 text-green-700" />
      </a>
      <a
        href="#"
        className="bg-green-100/30 hover:bg-green-200/50 p-3 rounded-2xl transition-colors"
      >
        <Twitter className="w-6 h-6 text-green-700" />
      </a>
      <a
        href="#"
        className="bg-green-100/30 hover:bg-green-200/50 p-3 rounded-2xl transition-colors"
      >
        <Linkedin className="w-6 h-6 text-green-700" />
      </a>
      <a
        href="#"
        className="bg-green-100/30 hover:bg-green-200/50 p-3 rounded-2xl transition-colors"
      >
        <Instagram className="w-6 h-6 text-green-700" />
      </a>
    </div>
  );
}