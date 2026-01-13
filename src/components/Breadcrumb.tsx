import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      {/* Home Icon */}
      <button
        onClick={items[0]?.onClick}
        className="flex items-center text-gray-500 transition-colors"
        style={{ transition: 'color 0.2s' }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#1A3D32'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
      >
        <Home className="w-4 h-4" />
      </button>

      {/* Breadcrumb Items */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
          {index === items.length - 1 ? (
            // Last item - not clickable
            <span className="text-gray-900">{item.label}</span>
          ) : (
            // Clickable items
            <button
              onClick={item.onClick}
              className="text-gray-500 transition-colors"
              style={{ transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1A3D32'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
              {item.label}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
}
