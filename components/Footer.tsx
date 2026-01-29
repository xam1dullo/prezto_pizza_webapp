
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Prezto Pizza. All Rights Reserved.</p>
        <p className="text-sm mt-1">Made with ❤️ for pizza lovers.</p>
      </div>
    </footer>
  );
};

export default Footer;
