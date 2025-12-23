import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Logo } from './Logo';

const footerLinks = {
  'Products & Services': [
    'Ocean Freight',
    'Inland Transportation',
    'Warehousing',
    'Supply Chain Solutions',
    'Cold Chain Logistics',
  ],
  'Industries': [
    'Automotive',
    'Retail & Fashion',
    'Technology',
    'Food & Beverage',
    'Healthcare',
  ],
  'Company': [
    'About Us',
    'Careers',
    'News & Media',
    'Sustainability',
    'Investors',
  ],
  'Support': [
    'Help Center',
    'Track Shipment',
    'Documentation',
    'Contact Us',
    'Locations',
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <button className="hover:text-white transition-colors">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="bg-white px-4 py-2 rounded">
            <Logo className="h-12" />
          </div>
          
          <div className="flex gap-4">
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Linkedin className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Instagram className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2025 Amaravathi. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="hover:text-white">Privacy Policy</button>
            <button className="hover:text-white">Terms of Service</button>
            <button className="hover:text-white">Cookie Settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
}