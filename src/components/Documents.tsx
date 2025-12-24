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
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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