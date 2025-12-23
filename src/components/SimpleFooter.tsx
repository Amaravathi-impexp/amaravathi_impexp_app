import { Logo } from './Logo';

export function SimpleFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="bg-white px-4 py-2 rounded">
            <Logo className="h-10" />
          </div>
          <p className="text-sm">© 2025 Amaravathi Imports & Exports. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}