import { useState } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';

interface NavigationProps {
  onSignInClick?: () => void;
}

export function Navigation({ onSignInClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Logo className="h-12" />
          </div>

          {/* Desktop Navigation - aligned right */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
              <span>About</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <button className="hover:text-blue-600">Careers</button>
            <button className="hover:text-blue-600">Contact</button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={onSignInClick}
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
            >
              Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button className="text-left">About</button>
              <button className="text-left">Careers</button>
              <button className="text-left">Contact</button>
              <button
                onClick={onSignInClick}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}