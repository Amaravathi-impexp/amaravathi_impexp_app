import { Logo } from '../common/Logo';

export function SimpleFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="bg-white px-8 py-4 rounded-lg inline-flex items-center overflow-hidden mb-6" style={{ height: '100px' }}>
          <Logo className="h-[200px]" />
        </div>
        <p className="text-sm">© 2025 TIMPEX.club - Telugu Import Export Club. All rights reserved.</p>
      </div>
    </footer>
  );
}