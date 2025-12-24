import { Upload, FileText, CheckCircle, XCircle, Clock, Download, Eye, AlertCircle, Search, ChevronDown, Ship, Anchor, Plane, User, Building2, FileCheck, Tag, Lock, MessageSquare } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import { useState } from 'react';

export function UploadDocuments() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [issuedDate, setIssuedDate] = useState('');
  const [issuedBy, setIssuedBy] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [confidential, setConfidential] = useState(false);
  const [notes, setNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = () => {
    // Upload logic
    console.log('Uploading:', { selectedFile, documentType, documentNumber, issuedDate, issuedBy, tags, confidential, notes });
    // Reset form after upload
    setSelectedFile(null);
    setDocumentType('');
    setDocumentNumber('');
    setIssuedDate('');
    setIssuedBy('');
    setTags([]);
    setConfidential(false);
    setNotes('');
  };

  const handleUploadAndAddAnother = () => {
    handleUpload();
    // Keep form open for another upload
  };

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  // Mock data for document checklist
  const documentChecklist = [
    { name: 'Commercial Invoice', status: 'uploaded', required: true, stage: 'now' },
    { name: 'Packing List', status: 'missing', required: true, stage: 'now' },
    { name: 'Bill of Lading', status: 'pending', required: false, stage: 'later' },
    { name: 'Shipping Bill', status: 'pending', required: false, stage: 'cha' },
    { name: 'Certificate of Origin', status: 'uploaded', required: false, stage: 'later' },
  ];

  // Mock data for document vault
  const documentVault = [
    { id: 1, type: 'Commercial Invoice', status: 'approved', uploadedBy: 'Exporter', date: 'Dec 24, 2024', fileSize: '2.4 MB' },
    { id: 2, type: 'Packing List', status: 'missing', uploadedBy: '—', date: '—', fileSize: '—' },
    { id: 3, type: 'Bill of Lading', status: 'pending', uploadedBy: 'Freight Forwarder', date: 'Dec 23, 2024', fileSize: '1.8 MB' },
    { id: 4, type: 'Certificate of Origin', status: 'approved', uploadedBy: 'Exporter', date: 'Dec 22, 2024', fileSize: '856 KB' },
    { id: 5, type: 'Customs Declaration', status: 'rejected', uploadedBy: 'CHA', date: 'Dec 21, 2024', fileSize: '1.2 MB' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploaded':
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'missing':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      approved: 'bg-green-100 text-green-700 border-green-200',
      missing: 'bg-red-100 text-red-700 border-red-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs border ${styles[status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredDocuments = documentVault.filter(doc => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'required-now') return ['missing', 'pending'].includes(doc.status);
    if (filterStatus === 'missing') return doc.status === 'missing';
    if (filterStatus === 'needs-approval') return doc.status === 'pending';
    if (filterStatus === 'rejected') return doc.status === 'rejected';
    return true;
  }).filter(doc => 
    searchQuery === '' || doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Shipments', href: '/dashboard' },
          { label: 'EXP-211', href: '/dashboard' },
          { label: 'Documents' },
        ]}
      />

      {/* Main Content - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* LEFT: Shipment Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="mb-4">Shipment Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Shipment ID:</span>
                <span className="text-sm">EXP-211</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Ship className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Type:</span>
                <span className="text-sm">Export</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Anchor className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Route:</span>
                <span className="text-sm">India → UAE</span>
              </div>
              
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">Status:</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">READY FOR CUSTOMS</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Mode:</span>
                <span className="text-sm">Sea</span>
              </div>
              
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Incoterm:</span>
                <span className="text-sm">FOB</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-4">
              <p className="text-sm mb-3">Parties:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Exporter</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">CHA</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Freight Forwarder</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-orange-700">Required Now: <span className="font-semibold">2 documents</span></p>
              <p className="text-xs text-orange-600 mt-1">Next Stage: Customs Filing</p>
            </div>

            {/* Document Checklist */}
            <div>
              <h3 className="text-sm mb-3">Document Checklist</h3>
              <div className="space-y-2">
                {documentChecklist.map((doc, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 rounded hover:bg-gray-50">
                    {getStatusIcon(doc.status)}
                    <div className="flex-1">
                      <p className="text-sm">{doc.name}</p>
                      {doc.required && (
                        <p className="text-xs text-red-600">Required {doc.stage === 'now' ? 'NOW' : doc.stage === 'cha' ? '(CHA)' : '(Later)'}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Upload Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="mb-6">Upload Document</h2>

            {/* Drag & Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center transition-colors ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="mb-2">Drop files here or <label className="text-blue-600 cursor-pointer hover:underline">
                Browse
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </label></p>
              <p className="text-sm text-gray-500">Supported formats: PDF, DOC, DOCX, JPG, PNG (max 10MB)</p>
              {selectedFile && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg inline-block">
                  <p className="text-sm text-green-700">✓ {selectedFile.name}</p>
                </div>
              )}
            </div>

            {/* Upload Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Document Type */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Document Type <span className="text-red-500">*</span></label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select type...</option>
                  <option value="invoice">Commercial Invoice</option>
                  <option value="packing">Packing List</option>
                  <option value="bl">Bill of Lading</option>
                  <option value="awb">Air Waybill</option>
                  <option value="shipping-bill">Shipping Bill</option>
                  <option value="coo">Certificate of Origin</option>
                  <option value="customs">Customs Declaration</option>
                  <option value="insurance">Insurance Certificate</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Document Number */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Document Number <span className="text-gray-400">(optional)</span></label>
                <input
                  type="text"
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                  placeholder="e.g., INV-2024-001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Issued Date */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Issued Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={issuedDate}
                  onChange={(e) => setIssuedDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Issued By */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Issued By <span className="text-red-500">*</span></label>
                <select
                  value={issuedBy}
                  onChange={(e) => setIssuedBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select issuer...</option>
                  <option value="exporter">Exporter</option>
                  <option value="cha">CHA (Customs House Agent)</option>
                  <option value="ff">Freight Forwarder</option>
                  <option value="shipping-line">Shipping Line</option>
                  <option value="airline">Airline</option>
                  <option value="bank">Bank</option>
                  <option value="govt">Government Authority</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {['Invoice', 'Customs', 'Freight', 'Insurance', 'Export', 'Import', 'Urgent'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                      tags.includes(tag)
                        ? 'bg-blue-100 text-blue-700 border-blue-300'
                        : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    <Tag className="w-3 h-3 inline mr-1" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Confidential Toggle */}
            <div className="mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confidential}
                  onChange={(e) => setConfidential(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <Lock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Mark as Confidential</span>
              </label>
              <p className="text-xs text-gray-500 ml-6 mt-1">Restricted access to authorized parties only</p>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">Notes <span className="text-gray-400">(optional)</span></label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional comments or instructions..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* AI Checks Info */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm text-purple-700">AI-Powered Document Verification</p>
                  <p className="text-xs text-purple-600 mt-1">Automatic OCR extraction, data validation, and mismatch detection will run upon upload</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleUpload}
                disabled={!selectedFile || !documentType || !issuedDate || !issuedBy}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Upload
              </button>
              <button
                onClick={handleUploadAndAddAnother}
                disabled={!selectedFile || !documentType || !issuedDate || !issuedBy}
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed"
              >
                Upload & Add Another
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Document Vault Table */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h2 className="mb-6">Document Vault</h2>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filterStatus === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('required-now')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filterStatus === 'required-now'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Required Now
          </button>
          <button
            onClick={() => setFilterStatus('missing')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filterStatus === 'missing'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Missing
          </button>
          <button
            onClick={() => setFilterStatus('needs-approval')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filterStatus === 'needs-approval'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Needs Approval
          </button>
          <button
            onClick={() => setFilterStatus('rejected')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filterStatus === 'rejected'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Rejected
          </button>

          <div className="ml-auto flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sort */}
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last updated ▼</option>
              <option>Document type</option>
              <option>Status</option>
              <option>Uploaded by</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-sm text-gray-600">Document Type</th>
                <th className="text-left px-4 py-3 text-sm text-gray-600">Status</th>
                <th className="text-left px-4 py-3 text-sm text-gray-600">Uploaded By</th>
                <th className="text-left px-4 py-3 text-sm text-gray-600">Last Updated</th>
                <th className="text-left px-4 py-3 text-sm text-gray-600">File Size</th>
                <th className="text-left px-4 py-3 text-sm text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{doc.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(doc.status)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">{doc.uploadedBy}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{doc.date}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{doc.fileSize}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {doc.status !== 'missing' && (
                        <>
                          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors" title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-purple-600 hover:bg-purple-50 rounded transition-colors" title="Audit Log">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {doc.status === 'missing' && (
                        <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                          Upload
                        </button>
                      )}
                      {doc.status === 'pending' && (
                        <button className="px-3 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700 transition-colors">
                          Replace
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No documents found</p>
          </div>
        )}
      </div>
    </div>
  );
}
