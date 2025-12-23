import { FileText, Upload, Download, Folder } from 'lucide-react';

export function Documents() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-2">Documents</h1>
          <p className="text-gray-600">Manage shipping documents and files</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Upload className="w-5 h-5" />
          Upload
        </button>
      </div>

      {/* Document Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Category 1 */}
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3>Invoices</h3>
              <p className="text-sm text-gray-500">24 files</p>
            </div>
          </div>
        </div>

        {/* Category 2 */}
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3>Bills of Lading</h3>
              <p className="text-sm text-gray-500">18 files</p>
            </div>
          </div>
        </div>

        {/* Category 3 */}
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3>Customs Documents</h3>
              <p className="text-sm text-gray-500">32 files</p>
            </div>
          </div>
        </div>

        {/* Category 4 */}
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3>Certificates</h3>
              <p className="text-sm text-gray-500">15 files</p>
            </div>
          </div>
        </div>

        {/* Category 5 */}
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <FileText className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3>Packing Lists</h3>
              <p className="text-sm text-gray-500">28 files</p>
            </div>
          </div>
        </div>

        {/* Category 6 */}
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Folder className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3>Other Documents</h3>
              <p className="text-sm text-gray-500">41 files</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2>Recent Documents</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {[
              { name: 'Invoice_AMRV-2024-001.pdf', type: 'Invoice', date: 'Dec 20, 2024' },
              { name: 'BOL_AMRV-2024-002.pdf', type: 'Bill of Lading', date: 'Dec 19, 2024' },
              { name: 'Customs_Declaration_003.pdf', type: 'Customs', date: 'Dec 18, 2024' },
              { name: 'Certificate_of_Origin.pdf', type: 'Certificate', date: 'Dec 17, 2024' },
              { name: 'Packing_List_004.pdf', type: 'Packing List', date: 'Dec 16, 2024' },
            ].map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.type} • {doc.date}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
