import { FileText, Upload, Download, Folder } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';

interface DocumentsProps {
  onNavigateToUpload?: () => void;
}

export function Documents({ onNavigateToUpload }: DocumentsProps) {
  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Documents' },
        ]}
      />
      
      {/* Upload Button */}
      <div className="flex justify-end mb-4 mt-6">
        <button 
          onClick={onNavigateToUpload}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors"
          style={{ backgroundColor: '#1A3D32' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2D5A4A'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1A3D32'}
        >
          <Upload className="w-5 h-5" />
          Upload
        </button>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-500">No documents uploaded yet.</p>
      </div>
    </div>
  );
}